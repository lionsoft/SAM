using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;
using Sam.Extensions.ErrorManager;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/CardAccess")]
    public class CardAccessController : CRUDController<CardAccess>
    {
        public class RequestAccessModel
        {
            public string[] DoorIds { get; set; }
            public string EmployeeId { get; set; }
            public string Note { get; set; }
        }

        [HttpPost, Route("RequestAccess")]
        public async Task RequestAccessAsync(RequestAccessModel model)
        {
            model.EmployeeId = model.EmployeeId ?? CurrentEmployee.Id;
            var e = await Db.Employees.Include(x => x.Card).FirstOrDefaultAsync(x => x.Id == model.EmployeeId);
            if (e == null) 
                throw new ApplicationException("Employee not found.");
            if (e.Card == null || e.Card.Status != CardStatus.Active) 
                throw new ApplicationException("Employee has no activated card.");
            foreach (var doorId in model.DoorIds)
            {
                var id = doorId;
                var door = await Db.Doors.Include(d => d.Area).Include(d => d.Area.Building).FirstOrDefaultAsync(d => d.Id == id);
                if (door == null) continue;
                if (door.PreApproved)
                {
                    // ToDo: PreApproved the door
                    continue;
                }
                // This door doesn't need to be approved
                if (door.ApprovalLevel == ApprovalLevel.Nobody) continue;

                // Door must be approved by Manager
                if (e.ManagerId == null) throw new ApplicationException("{0}: Card Access has to be approved by employee's manager, but the employee has no manager set.".Fmt(door.Name));
                CreateCardAccess(ApprovalLevel.Manager, e.ManagerId, e.CardId, id, model.Note);

                switch (door.ApprovalLevel)
                {
                    case ApprovalLevel.Building:
                        if (door.Area == null || door.Area.Building == null || door.Area.Building.OwnerId == null) throw new ApplicationException("{0}: Card Access has to be approved by building owner, but the building has no owner set.".Fmt(door.Name));
                        CreateCardAccess(ApprovalLevel.Building, door.Area.Building.OwnerId, e.CardId, id, model.Note);
                        break;
                    case ApprovalLevel.Area:
                        if (door.Area == null || door.Area.OwnerId == null) throw new ApplicationException("{0}: Card Access has to be approved by area owner, but the area has no owner set.".Fmt(door.Name));
                        CreateCardAccess(ApprovalLevel.Area, door.Area.OwnerId, e.CardId, id, model.Note);
                        break;
                    case ApprovalLevel.Door:
                        if (door.OwnerId == null) throw new ApplicationException("{0}: Card Access has to be approved by door owner, but the door has no owner set.".Fmt(door.Name));
                        CreateCardAccess(ApprovalLevel.Door, door.OwnerId, e.CardId, id, model.Note);
                        break;
                }
            }
            await Db.SaveChangesAsync();
        }

        private CardAccess CreateCardAccess(ApprovalLevel approvalLevel, string employeeId, string cardId, string doorId, string note)
        {
            var res = Db.CardAccesses.FirstOrDefault(ca => 
                           ca.CardId == cardId 
                        && ca.DoorId == doorId 
                        && ca.ApprovalLevel == approvalLevel 
                        && ca.ApprovalStatus == ApprovalStatus.WaitingForApproval
                        && ca.AssignmentType == AssignmentType.Special
                        )
                ?? new CardAccess
                    {
                        CardId = cardId,
                        DoorId = doorId,
                        ApprovalLevel = approvalLevel,
                        ApprovalStatus = ApprovalStatus.WaitingForApproval,
                        AssignmentType = AssignmentType.Special
                    };
            res.Note = note;
            res.ApprovedDate = null;
            var accessor = Db.Employees.Find(employeeId);
            if (accessor != null 
                && accessor.DelegateToId != null 
                && (accessor.DelegateFromDate ?? DateTime.MinValue) <= DateTime.Now 
                && (accessor.DelegateToDate ?? DateTime.MaxValue) >= DateTime.Now)
            {
                res.ApprovedById = accessor.DelegateToId;
            }
            else
            {
                res.ApprovedById = employeeId;
            }
            if (res.Id == null)
                Db.CardAccesses.Add(res);
            return res;
        }

        #region Overrides of CRUDController<CardAccess,string>

        protected override void PrepareSave(CardAccess entity, bool isNew)
        {
            base.PrepareSave(entity, isNew);
            if (entity.ApprovalStatus == ApprovalStatus.WaitingForApproval)
                entity.ApprovedDate = null;
            else if (!entity.ApprovedDate.HasValue)
                entity.ApprovedDate = DateTime.Now;
        }

        #endregion
    }
}
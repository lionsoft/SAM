using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;

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
                var door = await Db.Doors.FirstOrDefaultAsync(d => d.Id == id);
                if (door == null) continue;
                if (door.PreApproved)
                {
                    // ToDo: PreApproved the door
                }
                // This door doesn't need to be approved
                if (door.ApprovalLevel == ApprovalLevel.Nobody) continue;
                // Door must be approved by Manager
                Db.CardAccesses.Add(new CardAccess { ApprovalLevel = ApprovalLevel.Manager, CardId = e.CardId, DoorId = id, Note = model.Note });
                if (door.ApprovalLevel == ApprovalLevel.Manager) continue;
                // Door must be approved by BuildingOwner
                Db.CardAccesses.Add(new CardAccess { ApprovalLevel = ApprovalLevel.Building, CardId = e.CardId, DoorId = id, Note = model.Note });
                if (door.ApprovalLevel == ApprovalLevel.Building) continue;
                // Door must be approved by AreaOwner
                Db.CardAccesses.Add(new CardAccess { ApprovalLevel = ApprovalLevel.Area, CardId = e.CardId, DoorId = id, Note = model.Note });
                if (door.ApprovalLevel == ApprovalLevel.Area) continue;
                // Door must be approved by DoorOwner
                Db.CardAccesses.Add(new CardAccess { ApprovalLevel = ApprovalLevel.Door, CardId = e.CardId, DoorId = id, Note = model.Note });
            }
            await Db.SaveChangesAsync();
        }
    }
}
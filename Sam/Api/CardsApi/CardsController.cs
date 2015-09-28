using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;
using Sam.Extensions;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Cards")]
    public class CardsController : CRUDController<Card>
    {
        public class LostCardRequestModel
        {
            public string EmployeeId { get; set; }
            public string Explanation { get; set; }

        }

        #region Overrides of CRUDController<Card,string>

        protected override void PrepareSave(Card entity, bool isNew)
        {
            base.PrepareSave(entity, isNew);
            if (isNew)
                entity.Number = Db.SequentialIdProvider.GetNextId(Card.NumberSeq);
        }

        #endregion

        [HttpPost, Route("Activate/{cardId}/{*employeeId}")]
        public async Task ActivateAsync(string cardId, string employeeId)
        {
            var c = await GetAsync(cardId);
            if (c == null) throw new ApplicationException("Card not found.");
            if (c.Status == CardStatus.Inactive)
            {
#if !DEBUG
                c.Status = CardStatus.Active;
                c.ActivationCode = null;
#endif
                employeeId = employeeId ?? CurrentEmployee.Id;
                var e = Db.Employees.Find(employeeId);
                if (e == null) throw new ApplicationException("Employee not found.");
                e.CardId = cardId;
                Db.EmployeeCards.Add(new EmployeeCard { CardId = cardId, EmployeeId = employeeId });
                await Db.SaveChangesAsync();
            }
        }

        [HttpPost, Route("LostCardRequest")]
        public async Task LostCardRequestAsync(LostCardRequestModel model)
        {
            model.EmployeeId = model.EmployeeId ?? CurrentEmployee.Id;
            var e = Db.Employees.Find(model.EmployeeId);
            if (e == null) throw new ApplicationException("Employee not found.");
            var emails = new List<string>();
            if (e.Manager != null && e.Manager.Email != null)
                emails.Add(e.Manager.Email);
            await MailService.SendMailAsync(e.Email, emails, e.Name + ": I lost my card", model.Explanation);
        }
    }
}
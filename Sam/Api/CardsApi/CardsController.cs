using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;
using Sam.Extensions;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Cards")]
    public class CardsController : CRUDController<Card>
    {
        public class ActivateCardModel
        {
            public string CardId { get; set; }
            public string EmployeeId { get; set; }

        }
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

        [HttpPost, Route("Activate")]
        public async Task ActivateAsync(ActivateCardModel model)
        {
            var c = await GetAsync(model.CardId);
            if (c == null) throw new ApplicationException("Card not found.");
            if (c.Status == CardStatus.Inactive)
            {
#if !DEBUG
                c.ActivationCode = null;
#endif
                c.Status = CardStatus.Active;
                model.EmployeeId = model.EmployeeId ?? CurrentEmployee.Id;
                var e = await Db.Employees.FirstOrDefaultAsync(x => x.Id == model.EmployeeId);
                if (e == null) throw new ApplicationException("Employee not found.");
                e.CardId = model.CardId;
                Db.EmployeeCards.Add(new EmployeeCard { CardId = model.CardId, EmployeeId = model.EmployeeId });
                await Db.SaveChangesAsync();
            }
        }

        [HttpPost, Route("LostCardRequest")]
        public async Task LostCardRequestAsync(LostCardRequestModel model)
        {
            model.EmployeeId = model.EmployeeId ?? CurrentEmployee.Id;
            var e = await Db.Employees.Include(x => x.Card).FirstOrDefaultAsync(x => x.Id == model.EmployeeId);
            if (e == null) throw new ApplicationException("Employee not found.");
            if (e.Card != null)
            {
                e.Card.Status = CardStatus.Lost;
                e.CardId = null;
            }
            var emails = new List<string>();
            if (e.Manager != null && e.Manager.Email != null)
                emails.Add(e.Manager.Email);
            await Db.SaveChangesAsync();
            await MailService.SendMailAsync(e.Email, emails, e.Name + ": I lost my card", model.Explanation);
        }
    }
}
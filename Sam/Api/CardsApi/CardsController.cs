using System;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Cards")]
    public class CardsController : CRUDController<Card>
    {
        #region Overrides of CRUDController<Card,string>

        protected override void PrepareSave(Card entity, bool isNew)
        {
            base.PrepareSave(entity, isNew);
            if (isNew)
                entity.Number = Db.SequentialIdProvider.GetNextId(Card.NumberSeq);
        }

        #endregion

        [HttpPost, Route("Activate/{cardId}/{employeeId}")]
        public async Task ActivateAsync(string cardId, string employeeId)
        {
            var c = await GetAsync(cardId);
            if (c == null) throw new ApplicationException("Card not found.");
            if (c.Status == CardStatus.Inactive)
            {
                c.Status = CardStatus.Active;
                var e = Db.Employees.Find(employeeId);
                if (e == null) throw new ApplicationException("Employee not found.");
                e.CardId = cardId;
                Db.EmployeeCards.Add(new EmployeeCard { CardId = cardId, EmployeeId = employeeId });
                await Db.SaveChangesAsync();
            }
        }
    }
}
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
    }
}
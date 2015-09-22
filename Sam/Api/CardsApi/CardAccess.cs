using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/CardAccess")]
    public class CardAccessController : CRUDController<CardAccess>
    {
    }
}
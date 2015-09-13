using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Cards")]
    public class CardsController : CRUDController<Card>
    {
    }
}
using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Doors")]
    public class DoorsController : CRUDController<Door>
    {
    }
}
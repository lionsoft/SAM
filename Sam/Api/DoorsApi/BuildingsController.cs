using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Buildings")]
    public class BuildingsController : CRUDController<Building>
    {
    }
}
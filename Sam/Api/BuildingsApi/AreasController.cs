using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Areas")]
    public class AreasController : CRUDController<Area>
    {
    }
}
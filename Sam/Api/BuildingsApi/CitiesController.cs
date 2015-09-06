using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Cities")]
    public class CitiesController : CRUDController<City>
    {
    }
}
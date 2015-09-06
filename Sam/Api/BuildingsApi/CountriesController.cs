using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Countries")]
    public class CountriesController : CRUDController<Country>
    {
        
    }
}
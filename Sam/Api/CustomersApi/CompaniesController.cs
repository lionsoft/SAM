using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Companies")]
    public class CompaniesController : CRUDController<Company>
    {
        
    }
}
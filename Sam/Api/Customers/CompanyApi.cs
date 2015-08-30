using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Company")]
    public class CompanyApi : CRUDController<Company>
    {
    }
}
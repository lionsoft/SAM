using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Customer")]
    public class CustomerApi : CRUDController<Customer>
    {
    }
}
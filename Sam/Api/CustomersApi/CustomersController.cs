using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Customers")]
    public class CustomersController : CRUDController<Customer>
    {
    }
}
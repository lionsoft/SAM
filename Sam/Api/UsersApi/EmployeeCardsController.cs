using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/EmployeeCards")]
    public class EmployeeCardsController : CRUDController<EmployeeCard>
    {
    }
}
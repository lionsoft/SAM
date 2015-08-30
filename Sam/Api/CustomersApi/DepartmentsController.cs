using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Departments")]
    public class DepartmentsController : CRUDController<Department>
    {
    }
}
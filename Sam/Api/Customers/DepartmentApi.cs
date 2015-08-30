using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Department")]
    public class DepartmentApi : CRUDController<Department>
    {
    }
}
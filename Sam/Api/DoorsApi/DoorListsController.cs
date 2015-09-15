using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/DoorLists")]
    public class DoorListsController : CRUDController<DoorList>
    {
    }
}
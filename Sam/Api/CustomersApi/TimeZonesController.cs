using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/TimeZones")]
    public class TimeZonesController : CRUDController<TimeZone>
    {
    }
}
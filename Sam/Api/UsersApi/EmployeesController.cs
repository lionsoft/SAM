using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [System.Web.Http.Authorize, System.Web.Http.RoutePrefix("api/Employees")]
    public class EmployeesController : CRUDController<Employee>
    {

        [HttpPost, Route("UploadImage/{id?}")]
        public async Task<IHttpActionResult> UploadImage(string id)
        {
            var request = Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var root = System.Web.HttpContext.Current.Server.MapPath("~/images/employees");
            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            foreach (var file in provider.Contents)
            {
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();
                //Do whatever you want with filename and its binaray data.
            }
            return Ok();
        }
    }
}
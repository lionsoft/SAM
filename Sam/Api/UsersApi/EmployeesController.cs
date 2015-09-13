using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/Employees")]
    public class EmployeesController : CRUDController<Employee>
    {
        private const string ImagesFolder = "images/employees";

        [HttpPost, Route("UploadImage")]
        public async Task<IHttpActionResult> Upload()
        {
            return Ok(await UploadController.UploadFiles(Request, ImagesFolder));
        }

        public override async Task<Employee> SaveAsync(Employee entity, bool isNew)
        {
            var image = "";
            if (!isNew)
                image = Db.Employees.Where(e => e.Id == entity.Id).Select(e => e.Image).FirstOrDefault() ?? "";
            var res = await base.SaveAsync(entity, isNew);
            if (image != "" && res.Image.ToUpper() != image.ToUpper())
            {
                // Remove old image linked with employee
                var fileName = System.Web.HttpContext.Current.Server.MapPath(string.Format("~/{0}/{1}", ImagesFolder, image));
                if (File.Exists(fileName)) try { File.Delete(fileName); } catch { } 
            }
            return res;
        }
    }
}
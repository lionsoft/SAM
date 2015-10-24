using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;
using Sam.Extensions;
using Sam.Extensions.ErrorManager;

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

        [HttpPost, Route("ResetPin/{id?}")]
        public async Task<IHttpActionResult> ResetPin(string id = null)
        {
            var employee = CurrentEmployee;
            if (id != null)
                employee = Db.Employees.Find(id);
            if (employee != null)
            {
                if (employee.Email == null)
                    throw new ApplicationException("EmployeeEmailIsNotSet");
                employee.PinCode = RegeneratePinCode(employee);
                await Db.SaveChangesAsync();
                await MailService.SendMailAsync(employee.Email,
                    new[] {employee.Email},
                    "Your New PIN Code",
                    "Hello, {0}.\r\n\r\nYour new PIN Code: {1}".Fmt(employee.Name, employee.PinCode)
                    );
            }
            return Ok();
        }

        private int RegeneratePinCode(Employee employee)
        {
            var rnd = new Random();
            return rnd.Next(1000, 9999);
        }
    }
}
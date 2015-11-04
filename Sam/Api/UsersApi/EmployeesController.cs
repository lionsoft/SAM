using System;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;
using Sam.Extensions;
using Sam.Extensions.EntityFramework;
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
            string oldUserId = null;
            if (!isNew)
            {
                var imageUserId = Db.Employees.Where(e => e.Id == entity.Id).Select(e => new { e.Image, e.UserId }).FirstOrDefault();
                if (imageUserId != null)
                {
                    image = imageUserId.Image ?? "";
                    oldUserId = imageUserId.UserId ?? null;
                }
            }
                
            var res = await base.SaveAsync(entity, isNew);
            if (image != "" && res.Image.ToUpper() != image.ToUpper())
            {
                // Remove old image linked with employee
                var fileName = System.Web.HttpContext.Current.Server.MapPath(string.Format("~/{0}/{1}", ImagesFolder, image));
                if (File.Exists(fileName)) try { File.Delete(fileName); } catch { } 
            }
            var needSave = false;
            var newUserId = res.UserId;
            if (oldUserId != newUserId)
                needSave = await SetUserEmployeeAsync(oldUserId, null, res.Id);
            needSave = await SetUserEmployeeAsync(newUserId, res.Id, res.Id) || needSave;
            if (needSave)
                await Db.SaveChangesAsync();
            return res;
        }

        private async Task<bool> SetUserEmployeeAsync(string userId, string employeeId, string currentEmployeeId)
        {
            var res = false;
            if (userId != null)
            {
                var user = await Db.Users.FirstOrDefaultAsyncEx(x => x.Id == userId);
                if (user != null)
                {
                    var oldEmployeeId = user.EmployeeId;
                    if (oldEmployeeId != employeeId)
                    {
                        user.EmployeeId = employeeId;
                        res = true;
                        if (oldEmployeeId != null && oldEmployeeId != currentEmployeeId)
                        {
                            var oldEmployee = await Db.Employees.FirstOrDefaultAsyncEx(x => x.Id == oldEmployeeId);
                            if (oldEmployee != null)
                            {
                                oldEmployee.UserId = null;
                            }
                        }
                    }
/*
                    var employee = await Db.Employees.FirstOrDefaultAsyncEx(x => x.Id == oldEmployeeId);
                    if (employee != null)
                    {
                        res = employee.UserId != userId;
                        employee.UserId = userId;
                    }
*/
                }
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
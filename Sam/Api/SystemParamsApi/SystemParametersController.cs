using System.Threading.Tasks;
using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/SystemParameters")]
    public class SystemParametersController : CRUDController<SystemParameter, Parameter>
    {
        public async override Task<SystemParameter> GetAsync(Parameter id)
        {
            // Get common value of parameter
            var res = await Db.Set<SystemParameter>().FindAsync(id, null);
            if (id < 0)
            {
                // Try to get user value of parameter
                res = await Db.Set<SystemParameter>().FindAsync(id, CurrentUserId) ?? res;
            }
            return res;
        }

        public async override Task<SystemParameter> SaveAsync(SystemParameter entity, bool isNew)
        {
            // For user value parameter and if it is not saved as `default` set current user ID to record.
            if (entity.Id < 0 && entity.UserId != "") 
                entity.UserId = CurrentUserId;
            else
                entity.UserId = null;
            var e = await Db.Set<SystemParameter>().FindAsync(entity.Id, entity.UserId);
            if (e == null)
                Db.SystemParameters.Add(entity);
            else
                e.Value = entity.Value;
            await Db.SaveChangesAsync();
            return e;
        }

        public async override Task<bool> DeleteAsync(Parameter id)
        {
            var e = await Db.Set<SystemParameter>().FindAsync(id, null);
            if (e != null)
                Db.Set<SystemParameter>().Remove(e);
            e = await Db.Set<SystemParameter>().FindAsync(id, CurrentUserId);
            if (e != null)
                Db.Set<SystemParameter>().Remove(e);
            await Db.SaveChangesAsync();
            return e != null;
        }
    }
}
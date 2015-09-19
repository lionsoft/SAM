using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using Sam.DbContext;
using Sam.Extensions.EntityFramework;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/DepartmentLists")]
    public class DepartmentListsController : CRUDController<DepartmentList>
    {
        #region Overrides of CRUDController<DoorList,string>

        protected override void PrepareSave(DepartmentList entity, bool isNew)
        {
            var doorLists = entity.DoorLists;
            if (doorLists != null)
            {
                foreach (var doorList in doorLists)
                {
                    Db.Attach(doorList, false);
                }
            }
            if (!isNew && doorLists != null)
            {
                entity.DoorLists = null;
                Db.Attach(entity, false);
                entity = Db.DepartmentLists.Include(x => x.DoorLists).First(x => x.Id == entity.Id);
                entity.DoorLists.Clear();
                foreach (var doorList in doorLists)
                {
                    entity.DoorLists.Add(doorList);
                }
            }
        }

        #endregion
    }
}
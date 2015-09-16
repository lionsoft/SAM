using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using Sam.DbContext;
using Sam.Extensions.EntityFramework;

namespace Sam.Api
{
    [Authorize, RoutePrefix("api/DoorLists")]
    public class DoorListsController : CRUDController<DoorList>
    {
        #region Overrides of CRUDController<DoorList,string>

        protected override void PrepareSave(DoorList entity, bool isNew)
        {
            var doors = entity.Doors;
            if (doors != null)
            {
                foreach (var door in entity.Doors)
                {
                    Db.Attach(door, false);
                }
            }
            if (!isNew && doors != null)
            {
                entity.Doors = null;
                Db.Attach(entity, false);
                entity = Db.DoorLists.Include(x => x.Doors).First(x => x.Id == entity.Id);
                entity.Doors.Clear();
                foreach (var door in doors)
                {
                    entity.Doors.Add(door);
                }
            }
        }

        #endregion
    }
}
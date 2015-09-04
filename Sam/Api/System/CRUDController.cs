using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.OData;
using Sam.DbContext;
using Sam.Extensions.EntityFramework;

namespace Sam.Api
{
    public class CRUDController<TEntity, T> : AppController where TEntity : class, IEntityObjectId<T>
    {
        [HttpGet, EnableQuery]
        public virtual IQueryable<TEntity> Get()
        {
            return Db.Set<TEntity>();
        }

        [HttpGet, Route("{id}")]
        public virtual Task<TEntity> GetAsync(T id)
        {
            return Db.Set<TEntity>().FindAsync(id);
        }

        protected virtual void PrepareSave(TEntity entity, bool isNew)
        {

        }

        protected virtual bool IsNullId(T id)
        {
            var objId = (object)(id);
            return objId == null || (id is int && id.ToString() == "0");
        }

        [HttpPatch]
        public Task<TEntity> SaveAsync(TEntity entity)
        {
            return SaveAsync(entity, IsNullId(entity.Id));
        }

        public virtual async Task<TEntity> SaveAsync(TEntity entity, bool isNew)
        {
            PrepareSave(entity, isNew);
            Db.Attach(entity, isNew);
            await Db.SaveChangesAsync();
            //await Db.Entry(e).GetDatabaseValuesAsync();
            return entity;
        }


        [HttpPost]
        public Task<TEntity> CreateAsync(TEntity entity)
        {
            return SaveAsync(entity, true);
        }

        [HttpPut]
        public virtual Task<TEntity> UpdateAsync(TEntity entity)
        {
            return SaveAsync(entity, false);
        }

        [HttpDelete, Route("{id}")]
        public virtual async Task<bool> DeleteAsync(T id)
        {
            var e = await GetAsync(id);
            if (e != null)
            {
                Db.Set<TEntity>().Remove(e);
                await Db.SaveChangesAsync();
            }
                
            return e != null;
        }

    }

    
    public class CRUDController<TEntity> : CRUDController<TEntity, string> where TEntity : class, IEntityObjectId
    {
        protected override bool IsNullId(string id)
        {
            return string.IsNullOrWhiteSpace(id);
        }

        public override async Task<TEntity> SaveAsync(TEntity entity, bool isNew)
        {
            PrepareSave(entity, isNew);
            Db.Attach(entity, isNew);
            await Db.SaveChangesAsync();
            //await Db.Entry(entity).GetDatabaseValuesAsync();
            entity = Db.Set<TEntity>()
                .Include(x => x.CreatedBy)
                .Include(x => x.ModifiedBy)
                .First(x => x.Id == entity.Id);
            return entity;
        }

    }
}
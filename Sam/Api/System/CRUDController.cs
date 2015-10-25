using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.OData.Extensions;
using System.Web.Http.OData.Query;
using Sam.DbContext;
using Sam.Extensions.EntityFramework;

namespace Sam.Api
{
    public static class CRUDController
    {
        public static async Task<object> CreateODataResponse<TEntity>(IQueryable<TEntity> query, HttpRequestMessage request, ODataQueryOptions<TEntity> queryOptions) where TEntity : class
        {
            var results = queryOptions.ApplyTo(query);
            var res = await results.ToListAsync();
            if (queryOptions.InlineCount != null && queryOptions.InlineCount.Value == InlineCountValue.AllPages)
            {
                var odataProperties = request.ODataProperties();
                return new[] { new ODataMetadata<TEntity>(res, odataProperties.TotalCount) };
            }
            else
            {
                return new ODataMetadata<TEntity>(res, null).Results;
            }
        }
        public static async Task<object> CreateODataResponse<TResultEntity, TEntity>(IQueryable<TEntity> query, HttpRequestMessage request, ODataQueryOptions<TEntity> queryOptions) where TEntity : class where TResultEntity: class
        {
            var results = queryOptions.ApplyTo(query);
            var res = await results.ToListAsync();
            if (queryOptions.InlineCount != null && queryOptions.InlineCount.Value == InlineCountValue.AllPages)
            {
                var odataProperties = request.ODataProperties();
                return new[] { new ODataMetadata<TResultEntity>(res, odataProperties.TotalCount) };
            }
            else
            {
                return new ODataMetadata<TResultEntity>(res, null).Results;
            }
        }
    }


    public class CRUDController<TEntity, T> : AppController where TEntity : class, IEntityObjectId<T>
    {
        [HttpGet]
        public async virtual Task<object> Get(ODataQueryOptions<TEntity> queryOptions)
        {
            // extract $expand from request
            var expands = new HashSet<string>(queryOptions.SelectExpand == null ? new string[0] : queryOptions.SelectExpand.RawExpand.Split(','));

            // Force add CreatedBy and CreatedBy.Employees to request  
            if (typeof(EntityObjectId).IsAssignableFrom(typeof(TEntity)))
            {
                expands.Add("CreatedBy");
                expands.Add("CreatedBy.Employees");
            }

            // regenerate request with new $expand list
            var ub = new UriBuilder(Request.RequestUri);
            var prms = ub.Query.Trim('?').Split('&').ToDictionary(x => x.Split('=')[0], x => (x + "=").Split('=')[1]);
            prms["$expand"] = expands.Aggregate("", (result, item) => result + (result == "" ? "" : ",") + item.Replace('.', '/'));
            ub.Query = prms.Aggregate("", (result, item) => result + (result == "" ? "" : "&") + item.Key + "=" + item.Value);
            Request.RequestUri = ub.Uri;
            var qo = new ODataQueryOptions<TEntity>(queryOptions.Context, Request);
            queryOptions = qo;

            var res = await CRUDController.CreateODataResponse(Db.Set<TEntity>(), Request, queryOptions);
            return res;
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
/*
            var res = Db.Set<TEntity>()
                .Include(x => x.CreatedBy)
                .Include(x => x.ModifiedBy)
                .First(SimplifyExpression.Predicate<TEntity>(x => x.Id == entity.Id));
*/
            var res = (TEntity)((IQueryable<IEntityObjectId>)(Db.Set<TEntity>()))
                .Include(x => x.CreatedBy)
                .Include(x => x.ModifiedBy)
                .First(x => x.Id == entity.Id);
            return res;
        }

    }
}
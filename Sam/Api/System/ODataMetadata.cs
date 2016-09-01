using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Sam.DbContext;

namespace Sam.Api
{
    public class ODataMetadata<T> where T : class
    {
        protected ODataMetadata()
        {

        }
        public ODataMetadata(IEnumerable<T> result, long? count)
        {
            Count = count;
            Results = result;
        }

        public ODataMetadata(IEnumerable<object> result, long? count)
        {
            Count = count;
            if (typeof(T) == typeof(object))
                Results = (IEnumerable<T>)result;
            else
                Results = Convert(result);
        }
        private IEnumerable<T> Convert(IEnumerable<object> result)
        {
            return result.Select(x =>
            {
                var typ = x.GetType();
                var pi = x is T || typ.IsPublic ? null : typ.GetProperty("Instance");
                if (pi != null)
                {
                    var json = JsonConvert.SerializeObject(x);
                    x = JsonConvert.DeserializeObject<T>(json);
                }
                var item = PrepareResultEntity<T>(x);
                return item;
            });
        }

        private TEntity PrepareResultEntity<TEntity>(object p, int level = 0)
        {
            var u = p as User;
            if (u != null)
            {
                var jsonUser = JsonUser.Create(u);
                if (level > 0)
                    jsonUser.Employees = null;
                if (typeof(TEntity) == typeof(JsonUser))
                    p = jsonUser;
                else
                    p = jsonUser.ToUser();
            }
            return (TEntity)p;
        }


        [JsonProperty("value")]
        public IEnumerable<T> Results { get; protected set; }

        [JsonProperty("odata.count")]
        public long? Count { get; protected set; }

        [JsonProperty("odata.metadata")]
        public string MetadataUrl { get; protected set; }
    }
}
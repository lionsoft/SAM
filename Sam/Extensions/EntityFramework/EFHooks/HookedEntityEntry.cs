using System.Collections.Generic;
using System.Data.Entity;

namespace Sam.Extensions.EntityFramework.EFHooks
{
    public class HookedEntityEntry
    {
        public object Entity { get; set; }
        /// <summary>
        /// Gets or sets the state of the entity before saving.
        /// </summary>
        /// <value>
        /// The state of the entity before saving.
        /// </value>
        public EntityState PreSaveState { get; set; }

        public IDictionary<string, object> Data { get; private set; }

        public HookedEntityEntry()
        {
            Data = new Dictionary<string, object>();
        }
    }
}
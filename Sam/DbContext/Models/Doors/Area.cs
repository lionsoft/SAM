using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Area : EntityObjectId
    {
        public string Name { get; set; }

        public string BuildingId { get; set; }
        public Building Building { get; set; }

        public string OwnerId { get; set; }
        public Employee Owner { get; set; }
    }
}
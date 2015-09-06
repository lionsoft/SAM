using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Building : EntityObjectId
    {
        public string Name { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }

        public string CityId { get; set; }

        public City City { get; set; }

        public string OwnerId { get; set; }
        public User Owner { get; set; }
    }
}
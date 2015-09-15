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

        public string CustomerId { get; set; }
        public Customer Customer { get; set; }

        public string OwnerId { get; set; }
        public Employee Owner { get; set; }
    }
}
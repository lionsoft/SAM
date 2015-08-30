using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Company : EntityObjectId
    {
        public string Name { get; set; }

        public string ZipCode { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }

        public string CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}
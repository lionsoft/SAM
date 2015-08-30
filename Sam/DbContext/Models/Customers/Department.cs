using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Department : EntityObjectId
    {
        public string Name { get; set; }

        public string CompanyId { get; set; }

        public Company Company { get; set; }
    }
}
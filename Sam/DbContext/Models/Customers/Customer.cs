using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Customer : EntityObjectId
    {
        public string Name { get; set; }

    }
}
using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Customer : EntityObjectId
    {
        public string Name { get; set; }

        public int? PinCodeLength { get; set; }

        public string DefaultTimeZoneId { get; set; }
        public TimeZone DefaultTimeZone { get; set; }

        public string DefaultApproverId { get; set; }
        public Employee DefaultApprover { get; set; }
    }
}
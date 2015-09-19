using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class City : EntityObjectId
    {
        public string Name { get; set; }

        public string ZipCode { get; set; }

        public string CountryId { get; set; }
        public Country Country { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class TimeZone : EntityObjectId
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string CustomerId { get; set; }
        public Customer Customer { get; set; }

        public bool SunIsActive {get; set; }
        public TimeSpan SunFrom { get; set; }
        public TimeSpan SunTo { get; set; }


        public bool MonIsActive { get; set; }
        public TimeSpan MonFrom { get; set; }
        public TimeSpan MonTo { get; set; }

        public bool TueIsActive { get; set; }
        public TimeSpan TueFrom { get; set; }
        public TimeSpan TueTo { get; set; }

        public bool WedIsActive { get; set; }
        public TimeSpan WedFrom { get; set; }
        public TimeSpan WedTo { get; set; }

        public bool ThuIsActive { get; set; }
        public TimeSpan ThuFrom { get; set; }
        public TimeSpan ThuTo { get; set; }

        public bool FriIsActive { get; set; }
        public TimeSpan FriFrom { get; set; }
        public TimeSpan FriTo { get; set; }

        public bool SatIsActive { get; set; }
        public TimeSpan SatFrom { get; set; }
        public TimeSpan SatTo { get; set; }


        [JsonIgnore]
        [TypeScriptMember(Ignore = true)]
        [InverseProperty("DefaultTimeZone")]
        public ICollection<Customer> DefTimeZoneCustomers { get; set; }
    }
}
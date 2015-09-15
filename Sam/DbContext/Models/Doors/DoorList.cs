using System.Collections;
using System.Collections.Generic;
using T4TS;

namespace Sam.DbContext                          
{                          
    [TypeScriptInterface]
    public class DoorList : EntityObjectId
    {
        public string Name { get; set; }

        public string CustomerId { get; set; }
        public Customer Customer { get; set; }

        public ISet<Door> Doors { get; set; }

        public ISet<DepartmentList> DepartmentLists { get; set; }
    }
}
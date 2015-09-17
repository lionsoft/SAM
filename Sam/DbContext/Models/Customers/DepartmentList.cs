using System;
using System.Collections;
using System.Collections.Generic;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class DepartmentList : EntityObjectId
    {
        public string Name { get; set; }

        public string DepartmentId { get; set; }
        public Department Department { get; set; }

        public string ApprovedById { get; set; }
        
        public Employee ApprovedBy { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public ISet<DoorList> DoorLists { get; set; }
    }
}
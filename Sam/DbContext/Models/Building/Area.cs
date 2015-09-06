using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Area : EntityObjectId
    {
/*
        public string Name { get; set; }
        public string Email { get; set; }
        public int PinCode { get; set; }

        public EmployeeStatus Status { get; set; }
        public string Image { get; set; }


        public string DepartmentId { get; set; }
        public string ManagerId { get; set; }
*/
        public string Name { get; set; }

        public string BuildingId { get; set; }

        public Building Building { get; set; }

        public string OwnerId { get; set; }
        public User Owner { get; set; }
    }
}
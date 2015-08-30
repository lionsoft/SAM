using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Employee : EntityObjectId
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int PinCode { get; set; }

        public EmployeeStatus Status { get; set; }
        public string Image { get; set; }


        public string DepartmentId { get; set; }
        public string ManagerId { get; set; }
        public string UserId { get; set; }


        public DateTime CreatedDate { get; set; }
        public DateTime CreatedBy { get; set; }

    }
}
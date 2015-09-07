using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Employee : IEntityObjectId<string>
    {
        public string Id { get; set; }
        public string Name { get; set; }

        [TypeScriptMember(Optional = true)]
        public string Email { get; set; }
        public int? PinCode { get; set; }

        public EmployeeStatus Status { get; set; }

        [TypeScriptMember(Optional = true)]
        public string Image { get; set; }

        public UserRole UserRole { get; set; }

        [TypeScriptMember(Optional = true)]
        public string DepartmentId { get; set; }
        public Department Department { get; set; }

        [TypeScriptMember(Optional = true)]
        public string ManagerId { get; set; }
        public Employee Manager { get; set; }

        [TypeScriptMember(Optional = true)]
        public string UserId { get; set; }
        [TypeScriptMember(Type = "App.IUser")]
        public User User { get; set; }
    }
}
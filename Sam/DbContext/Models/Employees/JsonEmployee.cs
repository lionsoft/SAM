namespace Sam.DbContext
{
    public class JsonEmployee
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int? PinCode { get; set; }
        public EmployeeStatus Status { get; set; }
        public UserRole UserRole { get; set; }
        public string CardId { get; set; }
        public string DepartmentId { get; set; }
        public object Department { get; set; }
        private JsonEmployee(Employee e)
        {
            Name = e.Name;
            Email = e.Email;
            PinCode = e.PinCode;
            Status = e.Status;
            UserRole = e.UserRole;
            CardId = e.CardId;
            DepartmentId = e.DepartmentId;
            Department = e.Department == null ? null : new { e.Department.Name };
        }

        public static JsonEmployee Create(Employee e)
        {
            return e == null ? null : new JsonEmployee(e);
        }
    }
}
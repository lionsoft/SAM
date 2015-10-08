namespace Sam.DbContext
{
    public class JsonUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public Employee Employee { get; set; }
        private JsonUser(User user)
        {
            Id = user.Id;
            Name = user.Name;
            UserName = user.UserName;
            Email = user.Email;
            Employee = user.Employee;
        }
        public static JsonUser Create(User user)
        {
            return user == null ? null : new JsonUser(user);
        }

        public User ToUser()
        {
            return new User { Id = Id, Email = Email, UserName = UserName, Employee = Employee };
        }
    }
}
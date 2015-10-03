namespace Sam.DbContext
{
    public class JsonUser
    {
        public string Name { get; set; }
        private JsonUser(User user)
        {
            Name = user.Employee != null ? user.Employee.Name : user.UserName;
        }
        public static JsonUser Create(User user)
        {
            return user == null ? null : new JsonUser(user);
        }
    }
}
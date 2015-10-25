using System.Collections.Generic;
using System.Linq;

namespace Sam.DbContext
{
    public class JsonUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public Employee Employee { get; set; } 

        public IEnumerable<Employee> Employees { get { return null; } set { Employee = value != null ? value.FirstOrDefault() : null; } }
        private JsonUser(User user)
        {
            Id = user.Id;
            Name = user.Name;
            UserName = user.UserName;
            Email = user.Email;
            Employee = user.Employee;
        }

        public JsonUser()
        {
            
        }

        public static JsonUser Create(User user)
        {
            return user == null ? null : new JsonUser(user);
        }
    }

    public static class JsonUserExtension
{
        public static User ToUser(this JsonUser juser)
        {
            return juser == null ? null : new User { Id = juser.Id, Email = juser.Email, UserName = juser.UserName, Employee = juser.Employee };
        }

    }
}
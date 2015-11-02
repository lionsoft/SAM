using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Employee : EntityObjectId
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public int? PinCode { get; set; }

        public EmployeeStatus Status { get; set; }

        public string Image { get; set; }

        public UserRole UserRole { get; set; }

        public string DepartmentId { get; set; }
        public Department Department { get; set; }

        public string ManagerId { get; set; }
        public Employee Manager { get; set; }

        [InverseProperty("Manager")]
        public ICollection<Employee> Employees { get; set; }

        /// <summary>
        /// Identifier of the currently active card of employee.
        /// An employee can have only one active card in the moment.
        /// </summary>
        public string CardId { get; set; }
        /// <summary>
        /// Currently active card of employee.
        /// An employee can have only one active card in the moment.
        /// </summary>
        public Card Card { get; set; }


        [TypeScriptMember(Optional = true)]
        public string UserId { get; set; }
        [TypeScriptMember(Type = "App.IUser")]
        [JsonIgnore]
        public User User { get; set; }
        [JsonProperty("User")]
        [TypeScriptMember(Name = "User")]
        [NotMapped]
        public JsonUser JsonUser { get { return JsonUser.Create(User); } set { User = value.ToUser(); } }


        /// <summary>
        /// The options allows the employee make request to get access on behalf of another employee.
        /// </summary>
        public bool CanApplyAnothersAccess { get; set; }


        public string DelegateToId { get; set; }

        [InverseProperty("Delegaters")]
        public Employee DelegateTo { get; set; }
        public ICollection<Employee> Delegaters { get; set; }


        public DateTime? DelegateFromDate { get; set; }
        public DateTime? DelegateToDate { get; set; }


        [JsonIgnore]
        [TypeScriptMember(Ignore = true)]
        [InverseProperty("DefaultApprover")]
        public ICollection<Customer> DefaultApproverCustomers { get; set; }
    }
}
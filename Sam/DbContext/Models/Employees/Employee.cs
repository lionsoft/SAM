using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Employee : EntityObjectId
    {
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
        [TypeScriptMember(Optional = true)]
        public Department Department { get; set; }

        [TypeScriptMember(Optional = true)]
        public string ManagerId { get; set; }
        [TypeScriptMember(Optional = true)]
        public Employee Manager { get; set; }

        /// <summary>
        /// Identifier of the currently active card of employee.
        /// An employee can have only one active card in the moment.
        /// </summary>
        [TypeScriptMember(Optional = true)]
        public string CardId { get; set; }
        /// <summary>
        /// Currently active card of employee.
        /// An employee can have only one active card in the moment.
        /// </summary>
        [TypeScriptMember(Optional = true)]
        public Card Card { get; set; }


        [TypeScriptMember(Optional = true)]
        public string UserId { get; set; }
        [TypeScriptMember(Type = "App.IUser")]
        public User User { get; set; }


        /// <summary>
        /// The options allows the employee make request to get access on behalf of another employee.
        /// </summary>
        [TypeScriptMember(Optional = true)]
        public bool CanApplyAnothersAccess { get; set; }


        [TypeScriptMember(Optional = true)]
        public string DelegateToId { get; set; }

        [TypeScriptMember(Optional = true)]
        public Employee DelegateTo { get; set; }


        public DateTime? DelegateFromDate { get; set; }
        public DateTime? DelegateToDate { get; set; }
    }
}
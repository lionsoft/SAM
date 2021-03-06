﻿using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface(Name = "User")]
    public class TypeScriptUser
    {
        public string Id { get; set; }
        
        [TypeScriptMember(Optional = true)]
        public string UserName { get; set; }

        [TypeScriptMember(Optional = true)]
        public string PasswordHash { get; set; }

        [TypeScriptMember(Optional = true)]
        public string Email { get; set; }

        /**
         * An employee linked with the user
         */
        [TypeScriptMember(Optional = true)]
        public Employee Employee { get; set; }

        /**
         * Employee.Name if it connected with user, User.UserName otherwise.
         */
        [TypeScriptMember(Optional = true)]
        public string Name { get; set; }


/*
        [TypeScriptMember(Optional = true)]
        public string PhoneNumber { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
        public bool? LockoutEnabled { get; set; }
        public DateTime? LockoutEndDateUtc { get; set; }
        public bool? TwoFactorEnabled { get; set; }
*/
    }
}
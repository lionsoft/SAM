using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web.Helpers;
using Newtonsoft.Json;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Card : EntityObjectId
    {
        public const string NumberSeq = "CardNumbers";

        [TypeScriptMember(Optional = true)]
        [Index(IsUnique = true)]
        public long Number { get; set; }

        [TypeScriptMember(Optional = true)]
        public string ActivationCode { get; set; }

        [TypeScriptMember(Optional = true)]
        public CardStatus Status { get; set; }

        [TypeScriptMember(Optional = true)]
        public CardType CardType { get; set; }

        public string CustomerId { get; set; }

        [TypeScriptMember(Optional = true)]
        public Customer Customer { get; set; }

        public DateTime? DateExpiration { get; set; }

        /// <summary>
        /// Employees who have the card currently active.
        /// A card can belong to an only employee in the moment, so this list will have only one record.
        /// </summary>
        [TypeScriptMember(Optional = true)]
        [JsonIgnore]
        public ISet<Employee> Employees { get; set; }

        /// <summary>
        /// Employee who has the card currently active.
        /// A card can belong to an only employee in the moment.
        /// </summary>
        [NotMapped]
        [JsonIgnore]
        public Employee Employee
        {
            get { return Employees == null ? null : Employees.FirstOrDefault(); }
            set
            {
                if (value == null)
                    Employees = null;
                else
                    Employees = new HashSet<Employee> { value };
            }
        }

        [JsonProperty("Employee")]
        public JsonEmployee JsonEmployee
        {
            get { return JsonEmployee.Create(Employee); }
        }
    }
}
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class EmployeeCard : EntityObjectId
    {
        public string CardId { get; set; }
        public Card Card { get; set; }

        public string EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
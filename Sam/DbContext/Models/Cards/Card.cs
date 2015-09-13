using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Card : EntityObjectId
    {
        [TypeScriptMember(Optional = true)]
        public string Number { get; set; }

        [TypeScriptMember(Optional = true)]
        public string ActivationCode { get; set; }

        [TypeScriptMember(Optional = true)]
        public CardStatus Status { get; set; }

        [TypeScriptMember(Optional = true)]
        public CardType CardType { get; set; }

        public string CustomerId { get; set; }

        [TypeScriptMember(Optional = true)]
        public Customer Customer { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class SystemParameter : IEntityObjectId<Parameter>
    {
        [Key, Column(Order = 0)]
        public Parameter Id { get; set; }

        [Key, Column(Order = 1)]
        [TypeScriptMember(Optional = true)]
        public string UserId { get; set; }

        public string Value { get; set; }
    }
}
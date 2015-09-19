using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Country : EntityObjectId
    {
        public string Name { get; set; }
    }
}
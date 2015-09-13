using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class Door : EntityObjectId
    {
        public string Name { get; set; }

        public string AreaId { get; set; }
        public Area Area { get; set; }

        public string OwnerId { get; set; }
        public Employee Owner { get; set; }
    }
}
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptEnum]
    public enum ApprovalLevel
    {
        /// <summary>
        /// Nobody has improved the assignment
        /// </summary>
        Nobody = 0,
        /// <summary>
        /// Manager has improved the assignment
        /// </summary>
        Manager = 1,
        /// <summary>
        /// Building owner and Manager have improved the assignment
        /// </summary>
        Building = 2,
        /// <summary>
        /// Area owner, Building owner and Manager have improved the assignment
        /// </summary>
        Area = 3,
        /// <summary>
        /// Door owner, Area owner, Building owner and Manager have improved the assignment
        /// </summary>
        Door = 4
    }
}
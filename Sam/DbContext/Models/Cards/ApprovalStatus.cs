using T4TS;

namespace Sam.DbContext
{
    /// <summary>
    /// CardAccess approval statuses
    /// </summary>
    [TypeScriptEnum]
    public enum ApprovalStatus
    {
        /// <summary>
        /// Card access is waiting for approval
        /// </summary>
        WaitingForApproval = 0,
        /// <summary>
        /// Card access is approved
        /// </summary>
        Approved = 1,
        /// <summary>
        /// Card access is rejected
        /// </summary>
        Rejected = 2
    }
}
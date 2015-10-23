using T4TS;

namespace Sam.DbContext
{
    /// <summary>
    /// Assignment can be created in two ways: Standard or Special.
    /// </summary>
    [TypeScriptEnum]
    public enum AssignmentType
    {
        /// <summary>
        /// Applying through “Get Access”.
        /// </summary>
        Special = 0,

        /// <summary>
        /// Assignment are created automatically entering doors from DoorLists > DepartmentLists.
        /// </summary>
        Standard = 1,
    }
}
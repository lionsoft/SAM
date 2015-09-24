using System;
using T4TS;

namespace Sam.DbContext
{
    [Flags]
    [TypeScriptEnum]
    public enum UserRole
    {
        Undefined = 0,
        Normal = 1,
        BuildingOwner = 2,
        AreaOwner = 4,
        DoorOwner = 8,
        Manager = 16,
        Admin = 32
    }
}
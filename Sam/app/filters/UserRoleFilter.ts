'use strict';
module App.Filters {

    class UserRoleFilter extends EnumFilter
    {
        Source =
        [
            { Key: UserRole.Admin, Value: 'userRole.Admin' },
            { Key: UserRole.AreaOwner, Value: 'userRole.AreaOwner' },
            { Key: UserRole.BuildingOwner, Value: 'userRole.BuildingOwner' },
            { Key: UserRole.DoorOwner, Value: 'userRole.DoorOwner' },
            { Key: UserRole.Manager, Value: 'userRole.Manager' },
            { Key: UserRole.Normal, Value: 'userRole.Normal' },
        ];
    }

    app.filter("UserRole", UserRoleFilter.Factory());
}
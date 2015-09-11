'use strict';
module App.Filters {

    class UserRoleFilter extends EnumFilter
    {
        Source =
        [
            { Key: UserRole.Admin, Value: 'Admin' },
            { Key: UserRole.AreaOwner, Value: 'AreaOwner' },
            { Key: UserRole.BuildingOwner, Value: 'BuildingOwner' },
            { Key: UserRole.DoorOwner, Value: 'DoorOwner' },
            { Key: UserRole.Manager, Value: 'Manager' },
            { Key: UserRole.Normal, Value: 'Normal' },
        ];
    }

    app.filter("UserRole", UserRoleFilter.Factory());
}
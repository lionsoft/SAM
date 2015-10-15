'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Filters;
    (function (Filters) {
        var UserRoleFilter = (function (_super) {
            __extends(UserRoleFilter, _super);
            function UserRoleFilter() {
                _super.apply(this, arguments);
                this.Source = [
                    { Key: 32 /* Admin */, Value: 'Admin' },
                    { Key: 4 /* AreaOwner */, Value: 'AreaOwner' },
                    { Key: 2 /* BuildingOwner */, Value: 'BuildingOwner' },
                    { Key: 8 /* DoorOwner */, Value: 'DoorOwner' },
                    { Key: 16 /* Manager */, Value: 'Manager' },
                    { Key: 1 /* Normal */, Value: 'Normal' },
                ];
            }
            return UserRoleFilter;
        })(App.EnumFilter);
        App.app.filter("UserRole", UserRoleFilter.Factory());
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));

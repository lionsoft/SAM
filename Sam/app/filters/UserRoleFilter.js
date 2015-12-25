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
                    { Key: 32 /* Admin */, Value: 'userRole.Admin' },
                    { Key: 4 /* AreaOwner */, Value: 'userRole.AreaOwner' },
                    { Key: 2 /* BuildingOwner */, Value: 'userRole.BuildingOwner' },
                    { Key: 8 /* DoorOwner */, Value: 'userRole.DoorOwner' },
                    { Key: 16 /* Manager */, Value: 'userRole.Manager' },
                    { Key: 1 /* Normal */, Value: 'userRole.Normal' },
                ];
            }
            return UserRoleFilter;
        })(App.EnumFilter);
        App.app.filter("UserRole", UserRoleFilter.Factory());
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));
//# sourceMappingURL=UserRoleFilter.js.map
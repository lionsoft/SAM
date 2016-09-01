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
        var ManagersOfDepartmentFilter = (function (_super) {
            __extends(ManagersOfDepartmentFilter, _super);
            function ManagersOfDepartmentFilter() {
                _super.apply(this, arguments);
            }
            ManagersOfDepartmentFilter.prototype.Execute = function (employees, departmentId) {
                if (!employees)
                    return [];
                var res = employees.where(function (e) { return e.UserRole === 16 /* Manager */; });
                if (departmentId)
                    res = res.where(function (x) { return x.DepartmentId === departmentId; });
                return res.toArray();
            };
            return ManagersOfDepartmentFilter;
        }(App.Filter));
        App.app.filter("ManagersOfDepartment", ManagersOfDepartmentFilter.Factory());
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));
//# sourceMappingURL=ManagersOfDepartment.js.map
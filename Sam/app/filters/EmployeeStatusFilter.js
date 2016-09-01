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
        var EmployeeStatusFilter = (function (_super) {
            __extends(EmployeeStatusFilter, _super);
            function EmployeeStatusFilter() {
                _super.apply(this, arguments);
                this.Source = [
                    { Key: 1 /* Normal */, Value: 'employeeStatus.Normal' },
                    { Key: 0 /* New */, Value: 'employeeStatus.New' },
                    { Key: 2 /* Resigned */, Value: 'employeeStatus.Resigned' },
                ];
            }
            return EmployeeStatusFilter;
        }(App.EnumFilter));
        App.app.filter("EmployeeStatus", EmployeeStatusFilter.Factory());
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));
//# sourceMappingURL=EmployeeStatusFilter.js.map
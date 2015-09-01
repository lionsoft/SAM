'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Services;
    (function (Services) {
        var DepartmentsService = (function (_super) {
            __extends(DepartmentsService, _super);
            function DepartmentsService() {
                _super.apply(this, arguments);
            }
            return DepartmentsService;
        })(Services.CRUDService);
        App.app.service("samDepartments", DepartmentsService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamDepartmentsService.js.map
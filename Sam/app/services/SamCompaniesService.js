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
        var CompaniesService = (function (_super) {
            __extends(CompaniesService, _super);
            function CompaniesService() {
                _super.apply(this, arguments);
            }
            return CompaniesService;
        })(Services.CRUDService);
        App.app.service("samCompanies", CompaniesService.Factory("samDepartments"));
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamCompaniesService.js.map
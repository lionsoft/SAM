'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Services;
    (function (Services) {
        var CompaniesService = (function (_super) {
            __extends(CompaniesService, _super);
            function CompaniesService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Company";
            }
            Object.defineProperty(CompaniesService.prototype, "ApiService", {
                get: function () { return App.app.api.Companies; },
                enumerable: true,
                configurable: true
            });
            return CompaniesService;
        })(Services.CRUDService);
        App.app.service("samCompanies", CompaniesService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamCompaniesService.js.map
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
        var BuildingsService = (function (_super) {
            __extends(BuildingsService, _super);
            function BuildingsService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Building";
            }
            Object.defineProperty(BuildingsService.prototype, "ApiService", {
                get: function () { return App.app.api.Buildings; },
                enumerable: true,
                configurable: true
            });
            BuildingsService.prototype.prepareQuery = function (odata) {
                _super.prototype.prepareQuery.call(this, odata);
                odata.$expand("Owner");
            };
            return BuildingsService;
        })(Services.CRUDService);
        App.app.service("samBuildings", BuildingsService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamBuildingsService.js.map
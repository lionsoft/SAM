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
        var AreasService = (function (_super) {
            __extends(AreasService, _super);
            function AreasService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Area";
            }
            Object.defineProperty(AreasService.prototype, "ApiService", {
                get: function () { return App.app.api.Areas; },
                enumerable: true,
                configurable: true
            });
            AreasService.prototype.prepareQuery = function (odata, isSmartLoad) {
                _super.prototype.prepareQuery.call(this, odata, isSmartLoad);
                odata.$expand("Owner");
            };
            return AreasService;
        })(Services.CRUDService);
        App.app.service("samAreas", AreasService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));

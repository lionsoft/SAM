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
        var CitiesService = (function (_super) {
            __extends(CitiesService, _super);
            function CitiesService() {
                _super.apply(this, arguments);
                this.TypeDescription = "City";
            }
            Object.defineProperty(CitiesService.prototype, "ApiService", {
                get: function () { return App.app.api.Cities; },
                enumerable: true,
                configurable: true
            });
            return CitiesService;
        })(Services.CRUDService);
        App.app.service("samCities", CitiesService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));

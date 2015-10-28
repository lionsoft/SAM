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
        var CountriesService = (function (_super) {
            __extends(CountriesService, _super);
            function CountriesService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Country";
            }
            Object.defineProperty(CountriesService.prototype, "ApiService", {
                get: function () { return App.app.api.Countries; },
                enumerable: true,
                configurable: true
            });
            return CountriesService;
        })(Services.CRUDService);
        App.app.service("samCountries", CountriesService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));

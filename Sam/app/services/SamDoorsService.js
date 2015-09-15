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
        var DoorsService = (function (_super) {
            __extends(DoorsService, _super);
            function DoorsService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Door";
            }
            Object.defineProperty(DoorsService.prototype, "ApiService", {
                get: function () { return App.app.api.Doors; },
                enumerable: true,
                configurable: true
            });
            DoorsService.prototype.prepareQuery = function (odata, isSmartLoad) {
                _super.prototype.prepareQuery.call(this, odata, isSmartLoad);
                odata.$expand("Owner");
            };
            return DoorsService;
        })(Services.CRUDService);
        App.app.service("samDoors", DoorsService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamDoorsService.js.map
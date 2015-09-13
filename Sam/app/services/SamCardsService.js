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
        var CardsService = (function (_super) {
            __extends(CardsService, _super);
            function CardsService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Card";
            }
            Object.defineProperty(CardsService.prototype, "ApiService", {
                get: function () { return App.app.api.Cards; },
                enumerable: true,
                configurable: true
            });
            CardsService.prototype.GetDescription = function (card) {
                return card.Number;
            };
            CardsService.prototype.prepareQuery = function (odata, isSmartLoad) {
                odata.$expand("CreatedBy");
                if (!isSmartLoad)
                    odata.$orderBy("Number");
            };
            CardsService.prototype.LoadByCustomer = function (customerId) {
                var expands = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    expands[_i - 1] = arguments[_i];
                }
                return _super.prototype.Load.call(this, (_a = Services.OData.create).$expand.apply(_a, expands).eq("CustomerId", customerId));
                var _a;
            };
            return CardsService;
        })(Services.CRUDService);
        App.app.service("samCards", CardsService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamCardsService.js.map
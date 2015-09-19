'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Cards = (function (_super) {
            __extends(Cards, _super);
            function Cards() {
                _super.apply(this, arguments);
                this.customers = [];
            }
            Cards.prototype.Init = function () {
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.LoadCustomers());
            };
            Cards.prototype.LoadCustomers = function () {
                var _this = this;
                return this.samCustomers.Load().then(function (res) { return _this.customers = res.orderBy(function (x) { return x.Name; }).toArray(); });
            };
            Cards.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.customers", function () { return _this.selectedCustomerId = _this.customers.select(function (x) { return x.Id; }).firstOrDefault(); });
            };
            Cards.prototype.prepareQuery = function (odata) {
                odata
                    .eq("CustomerId", this.selectedCustomerId)
                    .eq("Status", this.selectedCardStatus, true);
                return "selectedCustomerId,selectedCardStatus";
            };
            Cards.prototype.prepareEdit = function (card) {
                if (!card.Id) {
                    card.Status = 0 /* Active */;
                    card.CardType = 0 /* Internal */;
                    card.CustomerId = this.selectedCustomerId;
                }
            };
            return Cards;
        })(App.Controller);
        // Register with angular
        App.app.controller('cards', Cards.Factory("samCustomers", "samCards"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=cards.js.map
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Filters;
    (function (Filters) {
        var CardStatusFilter = (function (_super) {
            __extends(CardStatusFilter, _super);
            function CardStatusFilter() {
                _super.apply(this, arguments);
                this.Source = [
                    { Key: 0 /* Active */, Value: 'cardStatus.Active' },
                    { Key: 1 /* Inactive */, Value: 'cardStatus.Inactive' },
                    { Key: 2 /* Lost */, Value: 'cardStatus.Lost' },
                ];
            }
            return CardStatusFilter;
        }(App.EnumFilter));
        App.app.filter("CardStatus", CardStatusFilter.Factory());
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));
//# sourceMappingURL=CardStatusFilter.js.map
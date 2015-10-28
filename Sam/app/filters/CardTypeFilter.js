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
        var CardTypeFilter = (function (_super) {
            __extends(CardTypeFilter, _super);
            function CardTypeFilter() {
                _super.apply(this, arguments);
                this.Source = [
                    { Key: 0 /* Internal */, Value: 'Internal' },
                    { Key: 1 /* Guest */, Value: 'Guest' },
                    { Key: 2 /* External */, Value: 'External' },
                    { Key: 3 /* Replacement */, Value: 'Replacement' },
                ];
            }
            return CardTypeFilter;
        })(App.EnumFilter);
        App.app.filter("CardType", CardTypeFilter.Factory());
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));

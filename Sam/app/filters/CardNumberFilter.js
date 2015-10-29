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
        var CardNumberFilter = (function (_super) {
            __extends(CardNumberFilter, _super);
            function CardNumberFilter() {
                _super.apply(this, arguments);
            }
            CardNumberFilter.prototype.Execute = function (value) {
                if (value) {
                    var str = "" + value;
                    var pad = "00000000";
                    return pad.substring(0, pad.length - str.length) + str;
                }
                else {
                    return "";
                }
            };
            return CardNumberFilter;
        })(App.Filter);
        App.app.filter("CardNumber", CardNumberFilter.Factory());
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));
//# sourceMappingURL=CardNumberFilter.js.map
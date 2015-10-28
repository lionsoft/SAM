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
        var AsHtmlFilter = (function (_super) {
            __extends(AsHtmlFilter, _super);
            function AsHtmlFilter() {
                _super.apply(this, arguments);
            }
            AsHtmlFilter.prototype.Execute = function (value) {
                return this.$sce.trustAsHtml(value);
            };
            return AsHtmlFilter;
        })(App.Filter);
        App.app.filter("asHtml", AsHtmlFilter.Factory('$sce'));
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));

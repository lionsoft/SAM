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
        var ConsoleFilter = (function (_super) {
            __extends(ConsoleFilter, _super);
            function ConsoleFilter() {
                _super.apply(this, arguments);
            }
            ConsoleFilter.prototype.Execute = function (value) {
                console.log(value);
                return "";
            };
            return ConsoleFilter;
        })(App.Filter);
        App.app.filter("console", ConsoleFilter.Factory());
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));
//# sourceMappingURL=Console.js.map
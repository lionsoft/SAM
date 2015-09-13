'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        /**
         * Fixes an issue when st-sort-default attribute without any value was ignored.
         *
         * Usage:
         *
         *  <th st-sort-default st-sort='Name'>Accending default sorting by Name</th>
         *  <th st-sort-default='reverse' st-sort='Name'>Descending default sorting by Name</th>
         *  <th st-sort-default='desc' st-sort='Name'>Descending default sorting by Name</th>
         */
        var StSortDefault = (function (_super) {
            __extends(StSortDefault, _super);
            function StSortDefault() {
                _super.apply(this, arguments);
                this.restrict = 'A';
                this.scope = false;
            }
            StSortDefault.prototype.PreLink = function (scope, element, attrs) {
                if (attrs.stSortDefault === "")
                    attrs.stSortDefault = "direct";
                else if (attrs.stSortDefault === "desc")
                    attrs.stSortDefault = "reverse";
            };
            return StSortDefault;
        })(LionSoftAngular.Directive);
        App.app.directive("stSortDefault", StSortDefault.Factory());
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=st-sort-default.js.map
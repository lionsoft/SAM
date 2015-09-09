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
        var NvAutoFocus = (function (_super) {
            __extends(NvAutoFocus, _super);
            function NvAutoFocus() {
                _super.apply(this, arguments);
                this.restrict = 'A';
            }
            NvAutoFocus.prototype.Link = function ($scope, $element) {
                this.$timeout(function () {
                    $element[0].focus();
                });
            };
            return NvAutoFocus;
        })(LionSoftAngular.Directive);
        App.app.directive("autofocus", NvAutoFocus.Factory());
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=autofocus.js.map
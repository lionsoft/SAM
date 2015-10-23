'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var AutoFocus = (function (_super) {
            __extends(AutoFocus, _super);
            function AutoFocus() {
                _super.apply(this, arguments);
                this.restrict = 'A';
            }
            AutoFocus.prototype.Link = function ($scope, $element) {
                this.$timeout(function () {
                    $element[0].focus();
                });
            };
            return AutoFocus;
        })(LionSoftAngular.Directive);
        App.app.directive("autofocus", AutoFocus.Factory());
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=autofocus.js.map
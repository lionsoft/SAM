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
         * Assign table controller to an controller variable.
         *
         * Usage:
         *      <table st-table sam-st-table='$.table'>
         *
         *      refreshTable() {
         *          this.table.refresh();
         *      }
         */
        var SamStTable = (function (_super) {
            __extends(SamStTable, _super);
            function SamStTable() {
                _super.apply(this, arguments);
                this.restrict = 'A';
                this.require = '^stTable';
                this.scope = false;
            }
            SamStTable.prototype.Link = function (scope, element, attrs, ctrl) {
                if (attrs.samStTable) {
                    var model = this.$parse(attrs.samStTable);
                    ctrl.refresh = function () { return ctrl.pipe(); };
                    model.assign(scope, ctrl);
                }
            };
            return SamStTable;
        })(LionSoftAngular.Directive);
        App.app.directive("samStTable", SamStTable.Factory());
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=sam-st-table.js.map
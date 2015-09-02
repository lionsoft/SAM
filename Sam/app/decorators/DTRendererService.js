'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Decorators;
    (function (Decorators) {
        // ReSharper disable once InconsistentNaming
        var DTRendererServiceDecorator = (function (_super) {
            __extends(DTRendererServiceDecorator, _super);
            function DTRendererServiceDecorator() {
                _super.apply(this, arguments);
            }
            DTRendererServiceDecorator.prototype.Decorate = function ($delegate) {
                var _this = this;
                this._renderDataTable = this.$delegate.renderDataTable;
                this.$delegate.renderDataTable = function ($elem, options) { return _this.renderDataTable($elem, options); };
            };
            // Makes table haders to be resizable when table width changed
            DTRendererServiceDecorator.prototype.renderDataTable = function ($elem, options) {
                var res = this._renderDataTable($elem, options);
                var dataTable = res.DataTable;
                dataTable.on("draw", function () {
                    if (dataTable.__ok)
                        return;
                    dataTable.__ok = true;
                    var el = $('#' + dataTable.table().container().id);
                    var tableHeaderWrapper = el.find(".dataTables_scrollBody table");
                    App.Utils.ResizeListener.Attach(tableHeaderWrapper, function () { return dataTable.draw(false); });
                });
                return res;
            };
            return DTRendererServiceDecorator;
        })(LionSoftAngular.ServiceDecorator);
        App.app.decorator("DTRendererService", DTRendererServiceDecorator.Factory());
    })(Decorators = App.Decorators || (App.Decorators = {}));
})(App || (App = {}));
//# sourceMappingURL=DTRendererService.js.map
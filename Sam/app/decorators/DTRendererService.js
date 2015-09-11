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
                var scrollY = dataTable.settings().scrollY;
                if (scrollY === undefined)
                    scrollY = $.fn.dataTable.defaults.scrollY;
                var paging = dataTable.settings().paging;
                if (paging === undefined)
                    paging = $.fn.dataTable.defaults.paging;
                var container = dataTable.table().container();
                var el = $('#' + container.id);
                if (paging)
                    el.addClass("dataTables_paging");
                else
                    el.addClass("dataTables_no_paging");
                if (scrollY)
                    el.addClass("dataTables_scrollY");
                else
                    el.addClass("dataTables_no_scrollY");
                //if (scrollY > 0)
                {
                    dataTable.draw(false);
                    var tableHeaderWrapper = el;
                    App.Utils.ResizeListener.Attach(tableHeaderWrapper, function () {
                        //    this.common.debouncedThrottle(container.id, () => dataTable.draw(false), 50);
                        res.dataTable.fnAdjustColumnSizing(false);
                    });
                }
                return res;
            };
            return DTRendererServiceDecorator;
        })(LionSoftAngular.ServiceDecorator);
        App.app.decorator("DTRendererService", DTRendererServiceDecorator.Factory("common"));
    })(Decorators = App.Decorators || (App.Decorators = {}));
})(App || (App = {}));
//# sourceMappingURL=DTRendererService.js.map
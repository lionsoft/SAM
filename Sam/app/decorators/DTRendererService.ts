'use strict';

module App.Decorators {

    // ReSharper disable once InconsistentNaming
    class DTRendererServiceDecorator extends LionSoftAngular.ServiceDecorator {

        private _renderDataTable: any;

        common: Shared.ICommon;

        protected Decorate($delegate) {
            this._renderDataTable = this.$delegate.renderDataTable;
            this.$delegate.renderDataTable = ($elem, options) => this.renderDataTable($elem, options);
        }

        // Makes table haders to be resizable when table width changed
        renderDataTable($elem, options): any {
            var res = this._renderDataTable($elem, options);
            var dataTable = res.DataTable;
            var scrollY = dataTable.settings().scrollY;
            if (scrollY === undefined) scrollY = $.fn.dataTable.defaults.scrollY;
            var paging = dataTable.settings().paging;
            if (paging === undefined) paging = $.fn.dataTable.defaults.paging;
            var container = dataTable.table().container();
            var el = $('#' + container.id);

            if (paging) el.addClass("dataTables_paging"); else el.addClass("dataTables_no_paging");
            if (scrollY) el.addClass("dataTables_scrollY"); else el.addClass("dataTables_no_scrollY");

            if (scrollY > 0) {
                dataTable.draw(false);
                var tableHeaderWrapper = el;
                Utils.ResizeListener.Attach(tableHeaderWrapper, () => {
                    //    this.common.debouncedThrottle(container.id, () => dataTable.draw(false), 50);
                    res.dataTable.fnAdjustColumnSizing(false);
                });
            }
            return res;
        }

    }

    app.decorator("DTRendererService", DTRendererServiceDecorator.Factory("common"));
}
 
'use strict';

module App.Decorators {

    // ReSharper disable once InconsistentNaming
    class DTRendererServiceDecorator extends LionSoftAngular.ServiceDecorator {

        private _renderDataTable: any;

        protected Decorate($delegate) {
            this._renderDataTable = this.$delegate.renderDataTable;
            this.$delegate.renderDataTable = ($elem, options) => this.renderDataTable($elem, options);
        }

        // Makes table haders to be resizable when table width changed
        renderDataTable($elem, options): any {
            var res = this._renderDataTable($elem, options);
            var dataTable = res.DataTable;
            dataTable.on("draw", () => {
                if (dataTable.__ok) return; 
                dataTable.__ok = true;
                var el = $('#' + dataTable.table().container().id);
                var tableHeaderWrapper = el.find(".dataTables_scrollBody table");
                Utils.ResizeListener.Attach(tableHeaderWrapper, () => dataTable.draw(false));
            });
            return res;
        }

    }

    app.decorator("DTRendererService", DTRendererServiceDecorator.Factory());
}
 
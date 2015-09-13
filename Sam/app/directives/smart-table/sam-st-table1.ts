'use strict';
module App.Directives {

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
    class SamStTable extends LionSoftAngular.Directive
    {
        restrict = 'A';
        require = '^stTable';
        scope = false;

        Link(scope: ng.IScope, element, attrs, ctrl) {
            if (attrs.samStTable) {
                var model = this.$parse(attrs.samStTable);
                ctrl.refresh = () => ctrl.pipe();
                model.assign(scope, ctrl);
            }
        }
    }

    app.directive("samStTable", SamStTable.Factory());
}
'use strict';
module App.Directives {

    class NvAutoFocus extends LionSoftAngular.Directive
    {
        restrict = 'A';

        Link($scope, $element) {
            this.$timeout(() => {
                $element[0].focus();
            });
        }
    }

    app.directive("autofocus", NvAutoFocus.Factory());
}
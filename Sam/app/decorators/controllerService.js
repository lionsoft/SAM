'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Decorators;
    (function (Decorators) {
        // ReSharper disable once InconsistentNaming
        /**
         *  Store controller name to its $scope
         */
        var ControllerServiceDecorator = (function (_super) {
            __extends(ControllerServiceDecorator, _super);
            function ControllerServiceDecorator() {
                _super.apply(this, arguments);
            }
            ControllerServiceDecorator.prototype.Decorate = function ($delegate) {
                return function (expression, locals, later, ident) {
                    if (typeof expression == "string") {
                        var arr = expression.split(" as ", 2);
                        if (arr.length == 1) {
                            locals.$scope.$controllerName = expression.trim();
                            locals.$scope.$controllerAs = "";
                        }
                        else {
                            locals.$scope.$controllerName = arr[0].trim();
                            locals.$scope.$controllerAs = arr[1].trim();
                        }
                    }
                    return $delegate(expression, locals, later, ident);
                };
            };
            return ControllerServiceDecorator;
        }(LionSoftAngular.ServiceDecorator));
        App.app.decorator("$controller", ControllerServiceDecorator.Factory());
    })(Decorators = App.Decorators || (App.Decorators = {}));
})(App || (App = {}));
//# sourceMappingURL=controllerService.js.map
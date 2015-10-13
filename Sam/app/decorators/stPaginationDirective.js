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
         * Add stGetPageSizes to the directive scope for custom paginator.
         */
        var StPaginationDirectiveDecorator = (function (_super) {
            __extends(StPaginationDirectiveDecorator, _super);
            function StPaginationDirectiveDecorator() {
                _super.apply(this, arguments);
            }
            StPaginationDirectiveDecorator.prototype.Link = function (scope, element, attrs, controllers, transclude) {
                _super.prototype.Link.call(this, scope, element, attrs, controllers, transclude);
                scope.stShowPageSizes = true;
                if (attrs.stShowPageSizes)
                    scope.$watch(attrs.stShowPageSizes, function (val) { return scope.stShowPageSizes = val; });
                scope.stGetPageSizes = function (current) { return [current, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].distinct().orderBy(function (x) { return x; }).toArray(); };
            };
            return StPaginationDirectiveDecorator;
        })(LionSoftAngular.DirectiveDecorator);
        App.app.decorator("stPaginationDirective", StPaginationDirectiveDecorator.Factory());
    })(Decorators = App.Decorators || (App.Decorators = {}));
})(App || (App = {}));
//# sourceMappingURL=stPaginationDirective.js.map
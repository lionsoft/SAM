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
         * Expand st-search directive functionality.
         *
         * Usage:
         *
         *   <div st-search='Name,Description' ... </div>
         *
         * If list of the searchin fields is not defined - Name field will be used by default.
         *
         * Formats:
          *     FieldName  - field has string type, use Contains function
         *     *FieldName  - field has string type, use StartsWith function
         *     FieldName*  - field has string type, use EndsWith function
         *     *FieldName* - field has string type, use Equal function
         *
         *     FieldName:i - field has integer type, use Equal function
         *
         */
        var StSearchDirectiveDecorator = (function (_super) {
            __extends(StSearchDirectiveDecorator, _super);
            function StSearchDirectiveDecorator() {
                _super.apply(this, arguments);
            }
            StSearchDirectiveDecorator.prototype.Link = function (scope, element, attrs, controllers, transclude) {
                attrs.stSearch = App.Utils.SmartTable.EncodeFieldNames(attrs.stSearch);
                _super.prototype.Link.call(this, scope, element, attrs, controllers, transclude);
            };
            return StSearchDirectiveDecorator;
        })(LionSoftAngular.DirectiveDecorator);
        App.app.decorator("stSearchDirective", StSearchDirectiveDecorator.Factory());
    })(Decorators = App.Decorators || (App.Decorators = {}));
})(App || (App = {}));
//# sourceMappingURL=stSearchDirective.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Filter = (function (_super) {
        __extends(Filter, _super);
        function Filter() {
            _super.apply(this, arguments);
        }
        Filter.addFactoryInjections = function (injects) {
            LionSoftAngular.Filter.addFactoryInjections(injects);
            this.addInjection(injects, "$filter");
        };
        Filter.prototype.Translate = function (langKey) {
            return this.$filter("translate")(langKey);
        };
        return Filter;
    })(LionSoftAngular.Filter);
    App.Filter = Filter;
})(App || (App = {}));
//# sourceMappingURL=Filter.js.map
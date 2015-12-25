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
         *  Configure Translate filter decorator
         */
        var TranslateFilterDecorator = (function (_super) {
            __extends(TranslateFilterDecorator, _super);
            function TranslateFilterDecorator() {
                _super.apply(this, arguments);
            }
            TranslateFilterDecorator.prototype.Execute = function (translationId, params) {
                var defValue = this.$translate['__makeNonLocalizedDefValue'](translationId);
                var currentView = "";
                if (translationId) {
                    if (this.$route.current)
                        currentView = this.$route.current.name;
                    var arr = translationId.split('|', 2);
                    if (arr.length === 2) {
                        translationId = arr[0].trim();
                        defValue = (arr[1] || "").trim();
                    }
                }
                var res;
                if (currentView) {
                    res = this.$delegate(currentView + "." + translationId, params);
                    if (res !== currentView + "." + translationId)
                        return this.$translate['__formatLocalizedValue'](res);
                }
                res = this.$delegate(translationId, params);
                if (res === translationId)
                    res = defValue;
                else
                    res = this.$translate['__formatLocalizedValue'](res);
                return res;
            };
            return TranslateFilterDecorator;
        })(LionSoftAngular.Filter);
        App.app.decorator("translateFilter", TranslateFilterDecorator.Factory("$delegate", "$route", "$translate"));
    })(Decorators = App.Decorators || (App.Decorators = {}));
})(App || (App = {}));
//# sourceMappingURL=translateFilter.js.map
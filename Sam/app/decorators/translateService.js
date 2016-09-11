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
         *  Configure Translate provider decorator
         */
        var TranslateServiceDecorator = (function (_super) {
            __extends(TranslateServiceDecorator, _super);
            function TranslateServiceDecorator() {
                _super.apply(this, arguments);
            }
            TranslateServiceDecorator.prototype.getFactoryResult = function () {
                var _this = this;
                this.$delegate['__makeNonLocalizedDefValue'] = function (s) { return s; };
                this.$delegate['__formatLocalizedValue'] = function (s) { return s; };
                if (App.app.isDebugMode) {
                    this.$delegate['__makeNonLocalizedDefValue'] = function (s) { return ("?" + s + "?"); };
                    this.$delegate['__formatLocalizedValue'] = function (s) { return ("[" + s.TrimRight('`') + "]"); };
                }
                var res = function (translationId, interpolateParams, interpolationId, defaultTranslationText) { return _this.Execute(translationId, interpolateParams, interpolationId, defaultTranslationText); };
                for (var idx in this.$delegate) {
                    if (this.$delegate.hasOwnProperty(idx)) {
                        res[idx] = this.$delegate[idx];
                    }
                }
                return res;
            };
            TranslateServiceDecorator.prototype.Execute = function (translationId, interpolateParams, interpolationId, defaultTranslationText) {
                var _this = this;
                if (angular.isArray(translationId)) {
                    var results = [];
                    defaultTranslationText = defaultTranslationText || [];
                    for (var i = 0; i < translationId.length; i++) {
                        results.push(this.Execute(translationId[i], interpolateParams, interpolationId, defaultTranslationText[i]));
                    }
                    return this.$q.all(results);
                }
                else if (angular.isString(translationId)) {
                    var defValue = this.$delegate['__makeNonLocalizedDefValue'](translationId);
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
                    defaultTranslationText = defaultTranslationText || defValue;
                    if (currentView) {
                        return this.$delegate(currentView + "." + translationId, interpolateParams, interpolationId)
                            .then(function (res) {
                            if (res === currentView + "." + translationId)
                                return _this.$delegate(translationId, interpolateParams, interpolationId, defaultTranslationText);
                            else
                                return _this.promiseFromResult(res);
                        })
                            .catch(function () {
                            return _this.$delegate(translationId, interpolateParams, interpolationId, defaultTranslationText);
                        })
                            .then(function (res) { return _this.$delegate['__formatLocalizedValue'](res); });
                    }
                    else {
                        return this.$delegate(translationId, interpolateParams, interpolationId, defaultTranslationText)
                            .then(function (res) { return _this.$delegate['__formatLocalizedValue'](res); });
                    }
                }
                else {
                    return this.promiseFromResult("");
                }
            };
            return TranslateServiceDecorator;
        }(LionSoftAngular.NgObject));
        App.app.decorator("$translate", TranslateServiceDecorator.Factory("$delegate", "$route"));
    })(Decorators = App.Decorators || (App.Decorators = {}));
})(App || (App = {}));
//# sourceMappingURL=translateService.js.map
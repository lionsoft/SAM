'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var SamStService = (function (_super) {
            __extends(SamStService, _super);
            function SamStService() {
                _super.apply(this, arguments);
                this.restrict = 'A';
                this.require = '^stTable';
                this.scope = true;
            }
            SamStService.prototype.PreLink = function (scope, element, attrs, ctrl) {
                var _this = this;
                var pipePromise = null;
                scope.$table = ctrl;
                scope.$params = scope.$eval(attrs.samStService);
                scope.$params.service = angular.isString(scope.$params.service) ? this.get(scope.$params.service) : scope.$params.service;
                scope.$items = scope.$eval(attrs.stTable) || [];
                scope.$edit = function (item) { return _this.Edit(scope, item); };
                scope.$delete = function (item) { return _this.Delete(scope, item); };
                ctrl.preventPipeOnWatch();
                ctrl.pipe = function () {
                    if (pipePromise !== null)
                        _this.$timeout.cancel(pipePromise);
                    pipePromise = _this.$timeout(function () { return _this.Load(scope); }, _this.stConfig.pipe.delay);
                    return pipePromise;
                };
            };
            SamStService.prototype.Link = function (scope, element, attrs, ctrl) {
                ctrl.pipe();
            };
            SamStService.prototype.addWatchers = function (scope, expressions) {
                for (var _i = 0; _i < expressions.length; _i++) {
                    var expr = expressions[_i];
                    if (!expr.StartsWith("$."))
                        expr = "$." + expr;
                    scope['__watchers'] = scope['__watchers'] || [];
                    if (!scope['__watchers'].Contains(expr)) {
                        scope['__watchers'].push(expr);
                        scope.$watch(expr, function () { return scope.$table.pipe(); });
                    }
                }
            };
            SamStService.prototype.Load = function (scope) {
                scope.$loading = true;
                var tableState = scope.$table.tableState();
                tableState.pagination.start = tableState.pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                tableState.pagination.number = tableState.pagination.number || this.stConfig.pagination.itemsByPage; // Number of entries showed per page.
                var odata = App.Services.OData.create;
                var watchExpressions;
                if (scope.$params.prepareQuery) {
                    if (scope.$)
                        watchExpressions = scope.$params.prepareQuery.apply(scope.$, [odata, scope.$table]);
                    else
                        watchExpressions = scope.$params.prepareQuery(odata, scope.$table);
                }
                if (watchExpressions) {
                    if (angular.isArray(watchExpressions))
                        this.addWatchers(scope, watchExpressions);
                    else if (angular.isString(watchExpressions))
                        this.addWatchers(scope, watchExpressions.split(','));
                }
                scope.$params.service.SmartLoad(tableState, scope.$items, odata).then(function () { return scope.$loading = false; });
            };
            SamStService.prototype.Edit = function (scope, item) {
                item = item || {};
                var res = undefined;
                if (scope.$params.prepareEdit) {
                    if (scope.$)
                        res = scope.$params.prepareEdit.apply(scope.$, [item, scope.$table]);
                    else
                        res = scope.$params.prepareEdit(item, scope.$table);
                }
                if (!res || !angular.isFunction(res.then))
                    res = scope.$params.service.EditModal(item, scope.$params.editTemplate, scope, false);
                if (res)
                    res.then(function () { return scope.$table.pipe(); });
            };
            SamStService.prototype.Delete = function (scope, item) {
                scope.$params.service.DeleteModal(item).then(function () { return scope.$table.pipe(); });
            };
            return SamStService;
        })(LionSoftAngular.Directive);
        App.app.directive("samStService", SamStService.Factory('stConfig'));
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=sam-st-service.js.map
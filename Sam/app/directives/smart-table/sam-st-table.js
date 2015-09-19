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
        var SamStTable = (function (_super) {
            __extends(SamStTable, _super);
            function SamStTable() {
                _super.apply(this, arguments);
                this.restrict = 'A';
                this.require = '^stTable';
                this.scope = true;
            }
            SamStTable.prototype.PreLink = function (scope, element, attrs, ctrl) {
                var _this = this;
                var pipePromise = null;
                scope.$table = ctrl;
                scope.$params = scope.$eval(attrs.samStTable);
                scope.$params.service = angular.isString(scope.$params.service) ? this.get(scope.$params.service) : scope.$params.service;
                scope.$items = scope.$eval(attrs.stTable) || [];
                scope.$edit = function (item) { return _this.Edit(scope, item, attrs.samStTable); };
                scope.$delete = function (item) { return _this.Delete(scope, item); };
                ctrl.preventPipeOnWatch();
                ctrl.pipe = function () {
                    if (pipePromise !== null)
                        _this.$timeout.cancel(pipePromise);
                    pipePromise = _this.$timeout(function () { }, _this.stConfig.pipe.delay);
                    var res = pipePromise.then(function () {
                        pipePromise = null;
                        return _this.Load(scope);
                    });
                    return res;
                };
            };
            SamStTable.prototype.Link = function (scope, element, attrs, ctrl) {
                ctrl.pipe();
            };
            SamStTable.prototype.addWatchers = function (scope, expressions) {
                for (var _i = 0; _i < expressions.length; _i++) {
                    var expr = expressions[_i];
                    if (!expr.StartsWith("$."))
                        expr = "$." + expr;
                    scope['__watchers'] = scope['__watchers'] || [];
                    if (!scope['__watchers'].Contains(expr)) {
                        var skipFirstTime = "__watchers" + expr;
                        scope[skipFirstTime] = true;
                        scope.$watch(expr, function () {
                            if (scope[skipFirstTime])
                                scope[skipFirstTime] = undefined;
                            else
                                scope.$table.pipe();
                        });
                        scope['__watchers'].push(expr);
                    }
                }
            };
            SamStTable.prototype.Load = function (scope) {
                if (scope.$loading)
                    return;
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
                scope.$params.service.SmartLoad(tableState, scope.$items, odata).finally(function () { return scope.$loading = false; });
            };
            SamStTable.prototype.Edit = function (scope, item, tableAttrs) {
                item = angular.copy(item || {});
                var res = undefined;
                var controller;
                if (typeof (scope.$params.controller) === "string") {
                    controller = this.$controller(scope.$params.controller, { '$scope': scope.$new(), '$item': item });
                }
                else {
                    controller = scope.$params.controller;
                }
                var params = scope.$params;
                if (controller) {
                    controller['$'] = scope.$;
                    controller.$scope['$'] = controller;
                    controller.$scope['__customController'] = controller;
                    controller.$scope['$item'] = controller['$item'];
                    scope['$item'] = item;
                    controller['$item'] = item;
                    params = controller.$scope.$eval(tableAttrs);
                    params.controller = controller;
                    params.prepareEdit = params.prepareEdit || scope.$params.prepareEdit;
                    params.editTemplate = params.editTemplate || scope.$params.editTemplate;
                    params.service = (angular.isString(params.service) ? this.get(params.service) : params.service) || scope.$params.service;
                }
                if (params.prepareEdit) {
                    if (controller)
                        res = params.prepareEdit.apply(controller, [item, scope.$table]);
                    else if (scope.$)
                        res = params.prepareEdit.apply(scope.$, [item, scope.$table]);
                    else
                        res = params.prepareEdit(item, scope.$table);
                }
                if (!res || !angular.isFunction(res.then))
                    res = this.promiseFromResult(res);
                // ReSharper disable once QualifiedExpressionMaybeNull
                res.then(function (r) {
                    if (r === false)
                        return false;
                    if (controller) {
                        return params.service.EditModal(item, params.editTemplate, controller.$scope, false);
                    }
                    else {
                        return params.service.EditModal(item, params.editTemplate, scope, false);
                    }
                })
                    .then(function (r) {
                    if (r)
                        scope.$table.pipe();
                });
            };
            SamStTable.prototype.Delete = function (scope, item) {
                scope.$params.service.DeleteModal(item).then(function () { return scope.$table.pipe(); });
            };
            return SamStTable;
        })(LionSoftAngular.Directive);
        App.app
            .config(["stConfig", function (stConfig) {
                stConfig.pagination.template = 'sam-tables-pagination-tmpl.html'.ExpandPath(App.URL.DIRECTIVES_ROOT + "smart-table");
            }])
            .directive("samStTable", SamStTable.Factory('stConfig', '$controller'));
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=sam-st-table.js.map
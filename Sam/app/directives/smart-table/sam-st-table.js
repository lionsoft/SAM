'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        /**
         * Usage:
         *
         *  <div st-table="[items]"
         *       [st-items-by-page="nnn"]
         *       [st-show-page-sizes="true"]
         *       sam-st-table='{ [id], service, [editTemplate], [prepareQuery], [prepareEdit], [controller], [onLoad]}'
         *  >
         *
         *  To force refresh the table in controller - send the event 'samStRefresh' with the table id.
         *
         *  Sample:
         *
         *     this.$scope.$broadcast('samStRefresh', 'tableId');
         */
        var SamStTable = (function (_super) {
            __extends(SamStTable, _super);
            function SamStTable() {
                _super.apply(this, arguments);
                this.restrict = 'A';
                this.require = 'stTable';
                this.scope = true;
            }
            SamStTable.prototype.Compile = function (element, attrs) {
                var innerTable = element.find('table');
                if (innerTable.length > 0) {
                    var tableOuterWrapper = angular.element("\n<div class=\"st-table-wrapper\">\n    <div class=\"st-table-wrapper-inner\"></div>\n    <div class=\"pre-loader\" ng-show=\"$loading\">\n        <div class=\"sp sp-circle\"></div>\n    </div>\n</div>");
                    var rows = innerTable.find('tbody>tr>td');
                    var colsCount = rows.length;
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (row.hasAttribute("colspan")) {
                            var colSpan = parseInt(row.getAttribute("colspan"));
                            if (colSpan > 1)
                                colsCount += colSpan - 1;
                        }
                    }
                    var noDataRow = angular.element("\n<tbody ng-show=\"$items.length == 0\">\n    <tr>\n        <td colspan=\"" + colsCount + "\" class=\"text-center\">\n            <span translate>NoTableData</span>\n        </td>\n    </tr>\n</tbody>\n");
                    var tableInnerWrapper = tableOuterWrapper.find('div.st-table-wrapper-inner');
                    var tableParent = innerTable.parent();
                    var nextAfterTableElement = innerTable.next();
                    innerTable.appendTo(tableInnerWrapper);
                    if (nextAfterTableElement.length > 0)
                        tableOuterWrapper.insertBefore(nextAfterTableElement);
                    else
                        tableParent.append(tableOuterWrapper);
                    noDataRow.insertBefore(innerTable.find('tbody'));
                    var pageSize = attrs.stItemsByPage === undefined ? undefined : (attrs.stItemsByPage ? parseInt(attrs.stItemsByPage) : 20);
                    if (pageSize) {
                        var showPageSizes = "st-show-page-sizes=\"" + (attrs.stShowPageSizes === undefined ? 'true' : attrs.stShowPageSizes) + "\"";
                        var paging = angular.element("<div st-pagination st-items-by-page=\"" + pageSize + "\" " + showPageSizes + "></div>");
                        paging.insertAfter(tableOuterWrapper);
                    }
                }
            };
            SamStTable.prototype.PreLink = function (scope, element, attrs, ctrl) {
                var _this = this;
                var pipePromise = null;
                scope.$table = ctrl;
                scope.$params = scope.$eval(attrs.samStTable);
                if (angular.isString(scope.$params.service)) {
                    var serviceName = scope.$params.service;
                    scope.$params.id = scope.$params.id || serviceName;
                    scope.$params.service = this.get(serviceName);
                }
                //            scope.$params.service = angular.isString(scope.$params.service) ? this.get(<any>scope.$params.service) : scope.$params.service;
                scope.$items = scope.$eval(attrs.stTable) || [];
                scope.$edit = function (item) { return _this.Edit(scope, item, attrs.samStTable); };
                scope.$delete = function (item) { return _this.Delete(scope, item); };
                scope.$on("samStRefresh", function (event, id) {
                    if (id === scope.$params.id)
                        ctrl.pipe();
                });
                ctrl.preventPipeOnWatch();
                ctrl.pipe = function () {
                    if (pipePromise !== null)
                        _this.$timeout.cancel(pipePromise);
                    pipePromise = _this.$timeout(function () { }, _this.stConfig.pipe.delay);
                    var res = pipePromise
                        .then(function () {
                        pipePromise = null;
                        return _this.Load(scope) || [];
                    })
                        .then(function (res) {
                        if (scope.$params.onLoad) {
                            if (scope.$)
                                scope.$params.onLoad.apply(scope.$, [res]);
                            else
                                scope.$params.onLoad(res);
                        }
                        return res;
                    });
                    return res;
                };
            };
            SamStTable.prototype.Link = function (scope, element, attrs, ctrl) {
                var stPagination = element.find('div[st-pagination][st-show-page-sizes]');
                if (stPagination.length > 0) {
                    var stShowPageSizes = attrs['stShowPageSizes'];
                    if (stShowPageSizes === undefined || scope.$eval(stShowPageSizes))
                        stPagination.addClass("st-show-page-sizes");
                    else
                        stPagination.addClass("st-hide-page-sizes");
                }
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
                return scope.$params.service.SmartLoad(tableState, scope.$items, odata).finally(function () { return scope.$loading = false; });
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
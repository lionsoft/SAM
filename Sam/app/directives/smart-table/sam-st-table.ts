'use strict';

module App.Directives {

    interface ISamStTableParams<T extends IEntityObjectId> {
        /**
         * Ссылка на CRUDService класса. (В разметке можно указань название сервиса).
         */
        service: Services.ICRUDService<T>;

        /**
         * Ссылка на HTML-шаблон редактирования объекта.
         */
        editTemplate: string;  
        
        /**
         * Вызывается перед выполнение запроса. Здесь можно добавить дополнительные условия отбора.
         * Возвращает список выражений, которые будут переданы в метод $scope.$watch() для отслеживания необходимости обновления запроса.
         * @param odata OData-параметры запроса
         * @param table ссылка на контроллер таблицы
         * @returns {} список выражений, которые будут переданы в метод $scope.$watch() для отслеживания необходимости обновления запроса
         */
        prepareQuery: (odata: Services.OData, table: st.IController) => string | string[];

        /**
         * Вызывается перед редактированием элемента. Здесь можно проинициализировать объект дополнительными значениями 
         * или даже полностью перекрыть редактирование по умолчанию.
         * Если возвращает промис - стандартный метод редактирования не будет вызван.
         * @param entity элемент для редактироания
         * @param table ссылка на контроллер таблицы
         * @returns {} если возвращает промис - стандартный метод редактирования не будет вызван.
         */
        prepareEdit: (entity: T, table: st.IController) => IPromise<T>;


        /**
         * Контроллер диалога редактирования (или наименование контроллера), если задан - будет использоваться именно он.
         */
        controller: Controller;
    }


    interface ISamStTableScope<T extends IEntityObjectId> extends ng.IScope {
        $table: st.IController;
        $loading: boolean;
        $: Controller;
        $params: ISamStTableParams<T>;
        $items: T[];
        $edit: (item: T) => void;
        $delete: (item: T) => void;
    }

    class SamStTable extends LionSoftAngular.Directive
    {
        restrict = 'A';
        require = '^stTable';
        scope = true;
        stConfig: st.IConfig;
        $controller;

        PreLink(scope: ISamStTableScope<IEntityObjectId>, element, attrs, ctrl: st.IController) {
            var pipePromise = null;
            scope.$table = ctrl;
            scope.$params = scope.$eval(attrs.samStTable);
            scope.$params.service = angular.isString(scope.$params.service) ? this.get(<any>scope.$params.service) : scope.$params.service;
            scope.$items = scope.$eval(attrs.stTable) || [];
            scope.$edit = item => this.Edit(scope, item, attrs.samStTable);
            scope.$delete = item => this.Delete(scope, item);

            ctrl.preventPipeOnWatch();
            ctrl.pipe = () => {
                if (pipePromise !== null)
                    this.$timeout.cancel(pipePromise);
                pipePromise = this.$timeout(() => { }, this.stConfig.pipe.delay);
                var res = pipePromise.then(() => {
                    pipePromise = null;
                    return this.Load(scope);
                });
                return res;
            }
        }

        Link(scope, element, attrs, ctrl: st.IController) {
            ctrl.pipe();
        }

        addWatchers(scope, expressions: string[]) {
            for (let expr of expressions) {
                if (!expr.StartsWith("$."))
                    expr = "$." + expr;
                scope['__watchers'] = scope['__watchers'] || [];
                if (!scope['__watchers'].Contains(expr)) {
                    var skipFirstTime = `__watchers${expr}`;
                    scope[skipFirstTime] = true;
                    scope.$watch(expr, () => {
                        if (scope[skipFirstTime])
                            scope[skipFirstTime] = undefined;
                        else
                            scope.$table.pipe();
                    });
                    scope['__watchers'].push(expr);
                }
            }            
        }

        Load(scope: ISamStTableScope<IEntityObjectId>) {
            if (scope.$loading) return;
            scope.$loading = true;
            var tableState = scope.$table.tableState();
            tableState.pagination.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            tableState.pagination.number = tableState.pagination.number || this.stConfig.pagination.itemsByPage;  // Number of entries showed per page.
            var odata = Services.OData.create;
            var watchExpressions;
            if (scope.$params.prepareQuery) {
                if (scope.$)
                    watchExpressions = scope.$params.prepareQuery.apply(scope.$, [odata, scope.$table]);
                else
                    watchExpressions = scope.$params.prepareQuery(odata, scope.$table);
            }
            if (watchExpressions) {
                if (angular.isArray(watchExpressions))
                    this.addWatchers(scope, <string[]>watchExpressions);
                else if (angular.isString(watchExpressions))
                    this.addWatchers(scope, watchExpressions.split(','));
            }
            scope.$params.service.SmartLoad(tableState, scope.$items, odata).then(() => scope.$loading = false);
        }

        Edit(scope: ISamStTableScope<IEntityObjectId>, item: IEntityObjectId, tableAttrs) {
            item = angular.copy(item || <IEntityObjectId>{});
            var res = undefined;

            var controller: Controller;

            if (typeof (<any>(scope.$params.controller)) === "string") {
                controller = this.$controller(scope.$params.controller, { '$scope': scope.$new(), '$item': item });
            } else {
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
                params.service = (angular.isString(params.service) ? this.get(<any>params.service) : params.service) || scope.$params.service;
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
            res.then(r => {
                    if (r === false) return <any>false;
                    if (controller) {
                        return params.service.EditModal(item, params.editTemplate, controller.$scope, false);
                    } else {
                        return params.service.EditModal(item, params.editTemplate, scope, false);
                    }
            })
            .then(r => {
                if (r) scope.$table.pipe();
            });
        }

        Delete(scope: ISamStTableScope<IEntityObjectId>, item: IEntityObjectId) {
            scope.$params.service.DeleteModal(item).then(() => scope.$table.pipe());
        }
    }

    app
        .config(["stConfig", (stConfig: st.IConfig) => {
            stConfig.pagination.template = 'sam-tables-pagination-tmpl.html'.ExpandPath(URL.DIRECTIVES_ROOT + "smart-table");
        }])
        .directive("samStTable", SamStTable.Factory('stConfig', '$controller'));
}
'use strict';

module App.Directives {

    interface ISamStServiceParams<T extends IEntityObjectId> {
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
    }


    interface ISamStServiceScope<T extends IEntityObjectId> extends ng.IScope {
        $table: st.IController;
        $loading: boolean;
        $: Controller;
        $params: ISamStServiceParams<T>;
        $items: T[];
        $edit: (item: T) => void;
        $delete: (item: T) => void;
    }

    class SamStService extends LionSoftAngular.Directive
    {
        restrict = 'A';
        require = '^stTable';
        scope = true;
        stConfig: st.IConfig;

        PreLink(scope: ISamStServiceScope<IEntityObjectId>, element, attrs, ctrl: st.IController) {
            var pipePromise = null;
            scope.$table = ctrl;
            scope.$params = scope.$eval(attrs.samStService);
            scope.$params.service = angular.isString(scope.$params.service) ? this.get(<any>scope.$params.service) : scope.$params.service;
            scope.$items = scope.$eval(attrs.stTable) || [];
            scope.$edit = item => this.Edit(scope, item);
            scope.$delete = item => this.Delete(scope, item);

            ctrl.preventPipeOnWatch();
            ctrl.pipe = () => {
                if (pipePromise !== null)
                    this.$timeout.cancel(pipePromise);
                pipePromise = this.$timeout(() => this.Load(scope), this.stConfig.pipe.delay);
                return pipePromise;
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
                    scope['__watchers'].push(expr);
                    scope.$watch(expr, () => scope.$table.pipe());
                }
            }            
        }

        Load(scope: ISamStServiceScope<IEntityObjectId>) {
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

        Edit(scope: ISamStServiceScope<IEntityObjectId>, item: IEntityObjectId) {
            item = item || <IEntityObjectId>{};
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
                res.then(() => scope.$table.pipe());
        }

        Delete(scope: ISamStServiceScope<IEntityObjectId>, item: IEntityObjectId) {
            scope.$params.service.DeleteModal(item).then(() => scope.$table.pipe());
        }
    }

    app.directive("samStService", SamStService.Factory('stConfig'));
}
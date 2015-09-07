﻿'use strict';

module App.Services {

    export interface IEntityObjectId {
        Id: string;
    }

    export interface ICRUDService<T extends IEntityObjectId> {

        /**
         * Описание типа
         */
        TypeDescription: string;

        /**
         * Описание объекта
         * @param entity Объект
         */
        GetDescription(entity: T): string;

        /**
        .* Получение объекта по его Id с сервера.
         * @param id идентификатор объекта
         * @param expandFields перечень $expand-полей. Массив строк или строка с разделителем ','.
         */
        Load(id: string, expandFields?: string | string[]): IPromise<T>;
        /**
        .* Получение списка объектов с сервера.
         * @param query параметры запроса
         */
        Load(query?: OData | IODataParams): IPromise<T[]>;

        /**
         * Сохранение объекта.
         * После успешного сохранения объекта, переданного в фунцию Save от сервера приходит объект,
         * соответствующий текущему состоянию на сервере после сохранения (например, с запоненными полями Id, Number и т.д.)
         * По умолчанию эти значения копируются в исходный объект (переданный в метод Save).
         * В параметры можно передать метод, который будет дополнительно вызван после стандартной обработки ответа.
         * @param entity сохраняемый объект
         * @param afterSave действие выполняемое после сохранения
         */
        Save(entity: T): IPromise<T>;

        /**
         * Производит обновление текущих данных объекта данными нового объекта.
         * Обновление происходит по глобальным правилам, заданным в сервисе.
         * @param destination целевой объект, данные которого нужно обновить
         * @param source объект, данными которого обновляют целевой объект.
         */
        Update(destination: T, source: T): T;
        /**
         * Производит обновление текущих данных объекта данными с сервиса.
         * Обновление происходит по глобальным правилам, заданным в сервисе.
         * Целевой объект получит обновлённые данные по Id.
         * @param destination целевой объект, данные которого нужно обновить
         */
        Update(destination: T): IPromise<T>;

        /**
         * Удаляет объект из базы данных по его Id.
         * @param id Идентификатор объекта.
         */
        Delete(id: string): IPromise<boolean>;

        /**
         * Вызывает всплывающий диалог для редактирования объекта.
         * В случае закрытия диалога по кнопке OK сохраняет изменения.
         * Объект доступен в скоупе диалога как $item.
         * Дополнительно можно передать свой скоуп, который будет доступен в скоупе диалога как $scope.
         * Также из исходного скоупа будут скопированы в скоуп диалога все поля, начинающиеся на $.
         * Возвращает промис окончания сохранения объекта.
         * @param entity редактируемый объект
         * @param editTemplateUrl ссылка на шаблон формы редактирования
         */
        EditModal(entity: T, editTemplateUrl: string, scope?: ng.IScope): IPromise<T>;

        /**
         * Вызывает всплывающий диалог для удаления объекта.
         * В случае закрытия диалога по кнопке YES - удаляет объект из базы и вызывает промис.
         * @param entity удаляемый объект
         */
        DeleteModal(entity: T): IPromise<void>;
    }

    /**
     * Базовый класс для всех прикладных сервисов.
     */
    export class CRUDService<T extends IEntityObjectId> extends Service implements ICRUDService<T> {

        /**
         * Описание типа
         */
        TypeDescription: string;

        /**
         * Описание объекта
         * @param entity Объект
         */
        GetDescription(entity: T): string {
            return entity['Description'] || entity['Name'];
        }

        $filter: ng.IFilterService;

        public static addFactoryInjections(injects: string[]) {
            Service.addFactoryInjections(injects);
            this.addInjection(injects, "$filter");
        }


        /**
         * Ресурс для работы с бекэндом сервиса.
         * Можно перекрыть в классе наследнике.
        */
        protected apiService: IResourceClass<T>;

        /**
         * Возвращает ресурс для работы с бекэндом сервиса.
         * По умолчанию, если ничего не делать в классах наследниках если они названы согласно Styleguid'у - Nv<ИмяКласса>Service
         * будет пытаться взять из поля app.Api.<ИмяКласса>.
         */
        get ApiService(): IResourceClass<T> {

            if (!this.apiService) {
                var serviceName = this.ngName;
                if (serviceName.EndsWith("Service"))
                    serviceName = serviceName.substr(0, serviceName.length - "Service".length);
                if (app.api[serviceName])
                    this.apiService = app.api[serviceName];
                else if (serviceName.StartsWith("sam", true)) {
                    serviceName = serviceName.substr(2, serviceName.length - 2);
                    this.apiService = app.api[serviceName];
                }
                if (!this.apiService) {
                    throw new Error("Необходимо задать значение поля apiService или реализовать метод getApiService в классе наследнике от CRUDService.");
                }
            }
            return this.apiService;
        }

        /**
         * Этот метод вызывается ПЕРЕД отправкой запроса query на сервер.
         * Перекрыв его в классе наследнике можно глобально влиять на запросы к бекенду данного класса.
         * @param odata параметры запроса
         */
        protected prepareQuery(odata: OData): void {
            odata.$expand("CreatedBy");
        }

        /**
         * Этот метод вызывается ПЕРЕД отправкой запроса get на сервер.
         * Перекрыв его в классе наследнике можно глобально влиять на запросы к бекенду данного класса.
         * @param odata параметры запроса (поддерживается только $expand параметр)
         */
        protected prepareGet(odata: OData): void {
            this.prepareQuery(odata);
        }

        /**
         * Этот метод вызывается ПЕРЕД отправкой запроса query на сервер.
         * Перекрыв его в классе наследнике можно глобально влиять на пришедший ответ.
         * Например, изменить поведение по умолчанию, когда в случае ошибки - она выводится на экран.
         * @param query промис запроса
         */
        protected afterQuery(query: IPromise<T[]>): IPromise<T[]> {
            return query.HandleError();
        }

        /**
         * Этот метод вызывается ПЕРЕД отправкой запроса get на сервер.
         * Перекрыв его в классе наследнике можно глобально влиять на пришедший ответ.
         * Например, изменить поведение по умолчанию, когда в случае ошибки - она НЕ выводится на экран.
         * @param query промис запроса
         */
        protected afterGet(query: IPromise<T>): IPromise<T> {
            return query;
        }

        /**
         * Этот метод вызывается ПОСЛЕ получения объекта или объектов с сервера.
         * Перекрыв его в классе наследнике можно глобально влиять на получение результатов.
         * Например, заполнить вычислимые поля или поля, которые как-то зависят от текущего состояния объекта.
         * По умолчанию этот метод вызывается при получении результатов методами Load ($query, $get) и Save (результат сохранения).
         * Если вы пишете свои дополнительные методы, которые получают объекты класса напрямую через apiServive - 
         * вызывайте этот метод при получении результата.
         * @param res объект - результат запроса.
         */
        protected prepareResult(res: T): void {
        }


        /**
         * Этот метод вызывается ПЕРЕД сохранением объекта.
         * Перекрыв его в классе наследнике можно глобально влиять на сохранение объектов.
         * Например, очищать ссылочные поля, которые в принципе не требуются при сохранении, 
         * но увеличивают рамер передаваемых данных и могут привести к циклическим ссылкам.
         */
        protected prepareSave(entity: T): void {
            for (let key in entity) {
                if (entity.hasOwnProperty(key)) {
                    if (key[0] === "$" || key[0] === "_")
                    // очищаем все приватные и внутренние поля
                        entity[key] = undefined;
                    // очищаем все ссылочные поля, кроме полей Moment и Date
                    else if (entity[key] !== null && typeof entity[key] === "object" && !entity[key]._isAMomentObject && !(entity[key] instanceof Date))
                        entity[key] = undefined;
                }
            }
        }

        /**
         * Этот метод вызывается ПОСЛЕ сохранения объекта.
         * Перекрыв его в классе наследнике можно глобально влиять на действия после сохранения объектов.
         * После успешного сохранения объекта, переданного в фунцию Save от сервера приходит объект,
         * соответствующий текущему состоянию на сервере после сохранения (например, с запоненными полями Id, Number и т.д.)
         * По умолчанию эти значения копируются в исходный объект (переданный в метод Save) как раз при помощи этого метода.
         * Данный метод также влияет на то, какой объект будет возвращён в качестве результата промиса Save.
         * По умолчанию - это объект, пришедший с сервера (не исходный).
         */
        protected afterSave(res: T, source: T, wasNew: boolean): T {
            // Копируем все поля
            for (let key in res) {
                if (res.hasOwnProperty(key)) {
                    if (key[0] === "$" || key[0] === "_") continue;
                    const priorValue = source[key];
                    const value = res[key];
                    // кроме ссылочных, если они равны null
                    if (typeof priorValue !== "object" || value)
                        source[key] = value;
                    // или если их Id составляющая равна null
                    else if (priorValue) {
                        if (!res[key + 'Id'])
                            source[key] = value;
                    }
                }
            }
            return res;
        }

        /**
        .* Получение списка объектов с сервера.
         * @param query параметры запроса
         */
        protected $query(query?: OData | IODataParams): IPromise<T[]> {
            var odata = query instanceof OData ? query : new OData(<IODataParams>query);
            this.prepareQuery(odata);
            var res = this.afterQuery(this.ApiService.query(odata));
            if (!this.prepareResult.isEmpty()) {
                res = res.then(r => {
                    if (angular.isArray(r))
                        r.forEach((x: any) => this.prepareResult(x));
                    return r;
                });
            }
            return res;
        }

        /**
        .* Получение объекта по его Id с сервера.
         * @param id идентификатор объекта
         * @param expandFields перечень $expand-полей. Массив строк или строка с разделителем ','.
         */
        protected $get(id: string, expandFields: string | string[]): IPromise<T> {
            expandFields = expandFields || "";
            if (angular.isArray(expandFields))
                expandFields = (<string[]>expandFields).join(',');
            var odata = new OData(<IODataParams>{ $expand: <string>expandFields });
            this.prepareGet(odata);
            var res;
            odata.$filter(undefined).$skip(undefined).$top(undefined).$orderBy(undefined);
            if (odata.toString()) {
                res = this.ApiService.query(odata.$id(id).$top(1)).then(r => r.firstOrDefault());
            } else {
                res = this.ApiService.get(id/*, odata*/);
            }
            // Добавляем проверку - не возвращать результат, если он равен null (или undefined)
            var resQ = this.defer<T>();
            this.afterGet(res)
                .then((r: any) => {
                    if (r) {
                        if (!this.prepareResult.isEmpty())
                        this.prepareResult(r);
                        resQ.resolve(r);
            }
                })
                .catch(err => resQ.reject(err));
            return <any>resQ.promise;
        }


        /**
        .* Получение объекта по его Id с сервера.
         * @param id идентификатор объекта
         * @param query параметры запроса - можно передать $expand параметр
         * @param expandFields перечень $expand-полей. Массив строк или строка с разделителем ','.
         */
        Load(id: string, expandFields?: string | string[]): IPromise<T>;
        /**
        .* Получение списка объектов с сервера.
         * @param query параметры запроса
         */
        Load(query?: OData | IODataParams): IPromise<T[]>;
        Load(p, p1?): any {
            if (angular.isString(p))
                return this.$get(p, p1);
            else
                return this.$query(p);
        }

        /**
         * Сохранение объекта.
         * После успешного сохранения объекта, переданного в фунцию Save от сервера приходит объект,
         * соответствующий текущему состоянию на сервере после сохранения (например, с запоненными полями Id, Number и т.д.)
         * По умолчанию эти значения копируются в исходный объект (переданный в метод Save).
         * В параметры можно передать метод, который будет дополнительно вызван после стандартной обработки ответа.
         * @param entity сохраняемый объект
         * @param afterSave действие выполняемое после сохранения
         */
        Save(entity: T, afterSave?: (res: T, source?: T, wasNew?: boolean) => T | void): IPromise<T> {
            var isNew = !entity.Id;
            var savedEntity = angular.copy(<any>entity);
            this.prepareSave(savedEntity);
            //var savePromise = isNew ? this.ApiService.create(savedEntity) : this.ApiService.update(savedEntity);
            var savePromise = this.ApiService.save(savedEntity);
            return savePromise.HandleError().then((res: any) => {
                var result = this.Update(entity, res);
                if (afterSave)
                    result = <any>afterSave(res, entity, isNew) || result;
                return result;
            });
        }

        /**
         * Производит обновление текущих данных объекта данными нового объекта.
         * Обновление происходит по глобальным правилам, заданным в сервисе.
         * @param destination целевой объект, данные которого нужно обновить
         * @param source объект, данными которого обновляют целевой объект.
         */
        Update(destination: T, source: T): T;
        /**
         * Производит обновление текущих данных объекта данными с сервиса.
         * Обновление происходит по глобальным правилам, заданным в сервисе.
         * Целевой объект получит обновлённые данные по Id.
         * @param destination целевой объект, данные которого нужно обновить
         */
        Update(destination: T): IPromise<T>;
        Update(p1, p2?: T) {
            var destination = p1;
            var source = p2;
            var isNew = !destination.Id;
            if (!isNew && !source) {
                return this.Load(destination.Id).then(r => this.Update(destination, <any>r));
            } else if (source) {
                destination.Id = source.Id;
                this.prepareResult(destination);
                return this.afterSave(source, destination, isNew) || destination;
            }
            return destination;
        }

        /**
         * Удаляет объект из базы данных по его Id.
         * @param id Идентификатор объекта.
         */
        Delete(id: string): IPromise<boolean> {
            return this.ApiService.delete(id).HandleError();
        }


        /**
         * Вызывает всплывающий диалог для редактирования объекта.
         * В случае закрытия диалога по кнопке OK сохраняет изменения.
         * Объект доступен в скоупе диалога как $item.
         * Дополнительно можно передать свой скоуп, который будет доступен в скоупе диалога как $scope.
         * Также из исходного скоупа будут скопированы в скоуп диалога все поля, начинающиеся на $.
         * Возвращает промис окончания сохранения объекта.
         * @param entity редактируемый объект
         * @param editTemplateUrl ссылка на шаблон формы редактирования
         */
        EditModal(entity: T, editTemplateUrl: string, scope?: ng.IScope): IPromise<T> {
            entity = entity || <any>{};
            scope = scope || app.get("$rootScope");
            // ReSharper disable once QualifiedExpressionMaybeNull
            scope = scope.$new();
            scope['$item'] = angular.copy(entity);
            scope['$templateUrl'] = editTemplateUrl.ExpandPath(LionSoftAngular.popupDefaults.templateUrlBase);
            scope['$entityTypeName'] = this.TypeDescription;
            return <IPromise<T>>app.popup.popupModal("html/edit-form.html".ExpandPath(LionSoftAngular.rootFolder), scope)
                .then(() => this.Save(scope['$item']))
                .then(res => this.Load(res.Id))
                .then(res => this.Update(entity, res));
        }

        /**
         * Вызывает всплывающий диалог для удаления объекта.
         * В случае закрытия диалога по кнопке YES - удаляет объект из базы и вызывает промис.
         * @param entity удаляемый объект
         */
        DeleteModal(entity: T): IPromise<void> {
            var def = this.defer<void>();
            if (!entity || !entity.Id) {
                def.reject();
            } else {
                app.popup.ask(this.$filter('translate')("AskDelete").format(this.TypeDescription.toLocaleLowerCase(), this.GetDescription(entity)), false)
                    .then(r => r ? this.Delete(entity.Id) : false)
                    .then(r => {
                        if (r)
                            def.resolve();
                        else
                            def.reject();
                    })
                    .catch(r => def.reject(r));
            }
            return <any>def.promise;
        }


    }

}
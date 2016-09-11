'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Services;
    (function (Services) {
        /**
         * Базовый класс для всех прикладных сервисов.
         */
        var CRUDService = (function (_super) {
            __extends(CRUDService, _super);
            function CRUDService() {
                _super.apply(this, arguments);
            }
            /**
             * Описание объекта.
             * Используется в частности в вопросе при удалении объекта.
             * @param entity Объект
             */
            CRUDService.prototype.GetDescription = function (entity) {
                return entity['Description'] || entity['Name'];
            };
            CRUDService.addFactoryInjections = function (injects) {
                App.Service.addFactoryInjections(injects);
                this.addInjection(injects, "$filter");
            };
            Object.defineProperty(CRUDService.prototype, "ApiService", {
                /**
                 * Возвращает ресурс для работы с бекэндом сервиса.
                 * По умолчанию, если ничего не делать в классах наследниках если они названы согласно Styleguid'у - Nv<ИмяКласса>Service
                 * будет пытаться взять из поля app.Api.<ИмяКласса>.
                 */
                get: function () {
                    if (!this.apiService) {
                        var serviceName = this.ngName;
                        if (serviceName.EndsWith("Service"))
                            serviceName = serviceName.substr(0, serviceName.length - "Service".length);
                        if (App.app.api[serviceName])
                            this.apiService = App.app.api[serviceName];
                        else if (serviceName.StartsWith("sam", true)) {
                            serviceName = serviceName.substr(2, serviceName.length - 2);
                            this.apiService = App.app.api[serviceName];
                        }
                        if (!this.apiService) {
                            throw new Error("Необходимо задать значение поля apiService или реализовать метод getApiService в классе наследнике от CRUDService.");
                        }
                    }
                    return this.apiService;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Этот метод вызывается ПЕРЕД отправкой запроса query на сервер.
             * Перекрыв его в классе наследнике можно глобально влиять на запросы к бекенду данного класса.
             * @param odata параметры запроса
             */
            CRUDService.prototype.prepareQuery = function (odata, isSmartLoad) {
                //            odata.$expand("CreatedBy, CreatedBy.Employees");
                //            odata.$expand("CreatedBy");
                if (!isSmartLoad)
                    odata.$orderBy("Name");
            };
            /**
             * Этот метод вызывается ПЕРЕД отправкой запроса get на сервер.
             * Перекрыв его в классе наследнике можно глобально влиять на запросы к бекенду данного класса.
             * @param odata параметры запроса (поддерживается только $expand параметр)
             */
            CRUDService.prototype.prepareGet = function (odata) {
                this.prepareQuery(odata);
            };
            /**
             * Этот метод вызывается ПЕРЕД отправкой запроса query на сервер.
             * Перекрыв его в классе наследнике можно глобально влиять на пришедший ответ.
             * Например, изменить поведение по умолчанию, когда в случае ошибки - она выводится на экран.
             * @param query промис запроса
             */
            CRUDService.prototype.afterQuery = function (query) {
                return query.HandleError();
            };
            /**
             * Этот метод вызывается ПЕРЕД отправкой запроса get на сервер.
             * Перекрыв его в классе наследнике можно глобально влиять на пришедший ответ.
             * Например, изменить поведение по умолчанию, когда в случае ошибки - она НЕ выводится на экран.
             * @param query промис запроса
             */
            CRUDService.prototype.afterGet = function (query) {
                /*
                            this._samUsers = this._samUsers || this.get("samUsers");
                            return query.then(r => {
                                if (r) {
                                    var d = this.defer();
                                    this._samUsers.UpdateEmployee(r["CreatedBy"]).finally(() => d.resolve(r));
                                    return d.promise;
                                } else
                                    return r;
                            });
                */
                return query;
            };
            /**
             * Этот метод вызывается ПОСЛЕ получения объекта или объектов с сервера.
             * Перекрыв его в классе наследнике можно глобально влиять на получение результатов.
             * Например, заполнить вычислимые поля или поля, которые как-то зависят от текущего состояния объекта.
             * По умолчанию этот метод вызывается при получении результатов методами Load ($query, $get) и Save (результат сохранения).
             * Если вы пишете свои дополнительные методы, которые получают объекты класса напрямую через apiServive -
             * вызывайте этот метод при получении результата.
             * @param res объект - результат запроса.
             */
            CRUDService.prototype.prepareResult = function (res) {
            };
            /**
             * Этот метод вызывается ПЕРЕД сохранением объекта.
             * Перекрыв его в классе наследнике можно глобально влиять на сохранение объектов.
             * Например, очищать ссылочные поля, которые в принципе не требуются при сохранении,
             * но увеличивают рамер передаваемых данных и могут привести к циклическим ссылкам.
             */
            CRUDService.prototype.prepareSave = function (entity) {
                for (var key in entity) {
                    if (entity.hasOwnProperty(key)) {
                        if (key[0] === "$" || key[0] === "_")
                            // очищаем все приватные и внутренние поля
                            entity[key] = undefined;
                        else if (entity[key] !== null && typeof entity[key] === "object" && !entity[key]._isAMomentObject && !(entity[key] instanceof Date))
                            entity[key] = undefined;
                    }
                }
            };
            /**
             * Этот метод вызывается ПОСЛЕ сохранения объекта.
             * Перекрыв его в классе наследнике можно глобально влиять на действия после сохранения объектов.
             * После успешного сохранения объекта, переданного в фунцию Save от сервера приходит объект,
             * соответствующий текущему состоянию на сервере после сохранения (например, с запоненными полями Id, Number и т.д.)
             * По умолчанию эти значения копируются в исходный объект (переданный в метод Save) как раз при помощи этого метода.
             * Данный метод также влияет на то, какой объект будет возвращён в качестве результата промиса Save.
             * По умолчанию - это объект, пришедший с сервера (не исходный).
             */
            CRUDService.prototype.afterSave = function (res, source, wasNew) {
                // Копируем все поля
                for (var key in res) {
                    if (res.hasOwnProperty(key)) {
                        if (key[0] === "$" || key[0] === "_")
                            continue;
                        var priorValue = source[key];
                        var value = res[key];
                        // кроме ссылочных, если они равны null
                        if (typeof priorValue !== "object" || value)
                            source[key] = value;
                        else if (priorValue) {
                            if (!res[key + 'Id'])
                                source[key] = value;
                        }
                    }
                }
                return res;
            };
            /**
            .* Получение списка объектов с сервера.
             * @param query параметры запроса
             */
            CRUDService.prototype.$query = function (query, isSmartLoad) {
                var _this = this;
                var odata = query instanceof Services.OData ? query : new Services.OData(query);
                this.prepareQuery(odata, isSmartLoad);
                var res = odata.$empty ? this.promiseFromResult([]) : this.afterQuery(this.ApiService.query(odata));
                if (!this.prepareResult.isEmpty()) {
                    res = res.then(function (r) {
                        if (r.length && angular.isArray(r)) {
                            var results = r;
                            /*
                                                    if (angular.isArray(results[0].Results))
                                                        results = results[0].Results;
                                                    if (odata.$translateResult) {
                                                        results = odata.$translateResult(results);
                                                        if (angular.isArray(results[0].Results)) {
                                                            if (angular.isArray(results))
                                                                results[0].Count = results.length;
                                                            else
                                                                results[0].Count = 0;
                                                        }
                                                    }
                            */
                            if (angular.isArray(results[0]['value']))
                                results = results[0]['value'];
                            if (odata.$translateResult) {
                                results = odata.$translateResult(results);
                                if (angular.isArray(results[0]['value'])) {
                                    if (angular.isArray(results))
                                        results[0]['odata.count'] = results.length;
                                    else
                                        results[0]['odata.count'] = 0;
                                }
                            }
                            results.forEach(function (x) { return _this.prepareResult(x); });
                        }
                        return r;
                    });
                }
                return res;
            };
            /**
            .* Получение объекта по его Id с сервера.
             * @param id идентификатор объекта
             * @param expandFields перечень $expand-полей. Массив строк или строка с разделителем ','.
             */
            CRUDService.prototype.$get = function (id, expandFields) {
                var _this = this;
                expandFields = expandFields || "";
                if (angular.isArray(expandFields))
                    expandFields = expandFields.join(',');
                var odata = new Services.OData({ $expand: expandFields });
                this.prepareGet(odata);
                var res;
                odata.$filter(undefined).$skip(undefined).$top(undefined).$orderBy(undefined);
                if (odata.toString()) {
                    res = this.ApiService.query(odata.$id(id).$top(1)).then(function (r) { return r.firstOrDefault(); });
                }
                else {
                    res = this.ApiService.get(id /*, odata*/);
                }
                // Добавляем проверку - не возвращать результат, если он равен null (или undefined)
                var resQ = this.defer();
                this.afterGet(res)
                    .then(function (r) {
                    if (r) {
                        if (!_this.prepareResult.isEmpty())
                            _this.prepareResult(r);
                        resQ.resolve(r);
                    }
                })
                    .catch(function (err) { return resQ.reject(err); });
                return resQ.promise;
            };
            CRUDService.prototype.appendQuery = function (fieldsName, value, odata, splitQueryStringBySpaces) {
                if (splitQueryStringBySpaces === void 0) { splitQueryStringBySpaces = false; }
                var values = (splitQueryStringBySpaces && (typeof value === "string")) ? value.split(' ') : [value];
                var fields = fieldsName.split(',');
                var ofc = undefined;
                var op = undefined;
                for (var n = 0; n < values.length; n++) {
                    var val = values[n];
                    if (val === undefined || val === null)
                        continue;
                    for (var i = 0; i < fields.length; i++) {
                        var fieldArr = fields[i].split(':');
                        var field = fieldArr[0];
                        var searchType = "contains";
                        if (field.StartsWith("*") && field.EndsWith("*")) {
                            // strict match
                            searchType = "eq";
                            field = field.substring(1, field.length - 1);
                        }
                        else if (field.StartsWith("*")) {
                            // from beginning
                            searchType = "startswith";
                            field = field.substring(1, field.length);
                        }
                        else if (field.EndsWith("*")) {
                            // from end
                            searchType = "endswith";
                            field = field.substring(0, field.length - 1);
                        }
                        var typ = (fieldArr[1] || "").toLowerCase();
                        if (typ === "i") {
                            // integer value
                            // strict search only
                            val = parseInt(val);
                            if (!isNaN(val)) {
                                ofc = op ? op.or(field) : (ofc || odata.prop(field));
                                op = ofc.eq(parseInt(val));
                            }
                        }
                        else if (typ === "d") {
                        }
                        else if (typ === "b") {
                            // boolean value
                            ofc = op ? op.or(field) : (ofc || odata.prop(field));
                            op = ofc.eq(val ? true : false);
                        }
                        else {
                            // string value
                            ofc = op ? op.or(field) : (ofc || odata.prop(field));
                            op = ofc[searchType](val);
                        }
                    }
                }
                if (op)
                    odata.and(op);
            };
            CRUDService.prototype.SmartLoad = function (tableState, dataSource, odata) {
                odata = (odata || Services.OData.create).$inlinecount();
                if (tableState.sort && angular.isString(tableState.sort.predicate)) {
                    odata.$orderBy(tableState.sort.predicate + (tableState.sort.reverse ? " desc" : ""));
                }
                if (tableState.pagination) {
                    odata.$skip(tableState.pagination.start);
                    odata.$top(tableState.pagination.number);
                }
                if (tableState.search) {
                    if (tableState.search.predicateObject) {
                        for (var propName in tableState.search.predicateObject) {
                            if (tableState.search.predicateObject.hasOwnProperty(propName)) {
                                var propValue = tableState.search.predicateObject[propName];
                                var fieldsName = App.Utils.SmartTable.DecodeFieldNames(propName);
                                if (fieldsName === '$')
                                    fieldsName = 'Name';
                                this.appendQuery(fieldsName, propValue, odata);
                            }
                        }
                    }
                }
                return this.$query(odata, true).then(function (res) {
                    var result = null;
                    if (angular.isArray(res)) {
                        result = res[0] || [];
                        /*
                                            if (!angular.isArray(result.Results)) {
                                                result.Results = res;
                                                result.Count = 0;
                                            }
                        
                                            if (odata.$translateResult) {
                                                result.Results = odata.$translateResult(result.Results);
                                                if (angular.isArray(result.Results))
                                                    result.Count = result.Results.length;
                                                else
                                                    result.Count = 0;
                                            }
                        */
                        if (!angular.isArray(result['value'])) {
                            result['value'] = res;
                            result['odata.count'] = 0;
                        }
                        if (odata.$translateResult) {
                            result['value'] = odata.$translateResult(result['value']);
                            if (angular.isArray(result['value']))
                                result['odata.count'] = result['value'].length;
                            else
                                result['odata.count'] = 0;
                        }
                    }
                    /*
                                    if (result && angular.isArray(result.Results)) {
                                        tableState.pagination.numberOfPages = Math.ceil(result.Count / tableState.pagination.number);//set the number of pages so the pagination can update
                                        if (dataSource && angular.isArray(dataSource)) {
                                            dataSource.Clear();
                                            dataSource.AddRange(result.Results);
                                        }
                                        res = result.Results;
                                    } else {
                                        tableState.pagination.numberOfPages = 0;
                                    }
                    */
                    if (result && angular.isArray(result['value'])) {
                        tableState.pagination.numberOfPages = Math.ceil(result['odata.count'] / tableState.pagination.number); //set the number of pages so the pagination can update
                        if (dataSource && angular.isArray(dataSource)) {
                            dataSource.Clear();
                            dataSource.AddRange(result['value']);
                        }
                        res = result['value'];
                    }
                    else {
                        tableState.pagination.numberOfPages = 0;
                    }
                    if (dataSource && angular.isArray(dataSource)) {
                        dataSource.Clear();
                        dataSource.AddRange(res);
                    }
                    return dataSource || res;
                });
            };
            CRUDService.prototype.Load = function (p, p1) {
                if (angular.isString(p))
                    return this.$get(p, p1);
                else
                    return this.$query(p);
            };
            /**
             * Сохранение объекта.
             * После успешного сохранения объекта, переданного в фунцию Save от сервера приходит объект,
             * соответствующий текущему состоянию на сервере после сохранения (например, с запоненными полями Id, Number и т.д.)
             * По умолчанию эти значения копируются в исходный объект (переданный в метод Save).
             * В параметры можно передать метод, который будет дополнительно вызван после стандартной обработки ответа.
             * @param entity сохраняемый объект
             * @param afterSave действие выполняемое после сохранения
             */
            CRUDService.prototype.Save = function (entity, afterSave) {
                var _this = this;
                var isNew = !entity.Id;
                var savedEntity = angular.copy(entity);
                this.prepareSave(savedEntity);
                //var savePromise = isNew ? this.ApiService.create(savedEntity) : this.ApiService.update(savedEntity);
                var savePromise = this.ApiService.save(savedEntity);
                return savePromise.HandleError().then(function (res) {
                    var result = _this.Update(entity, res);
                    if (afterSave)
                        result = afterSave(res, entity, isNew) || result;
                    return result;
                });
            };
            CRUDService.prototype.Update = function (p1, p2) {
                var _this = this;
                var destination = p1;
                var source = p2;
                if (!destination)
                    return undefined;
                var isNew = !destination.Id;
                if (!isNew && !source) {
                    return this.Load(destination.Id).then(function (r) { return _this.Update(destination, r); });
                }
                else if (source) {
                    destination.Id = source.Id;
                    this.prepareResult(destination);
                    return this.afterSave(source, destination, isNew) || destination;
                }
                return destination;
            };
            /**
             * Удаляет объект из базы данных по его Id.
             * @param id Идентификатор объекта.
             */
            CRUDService.prototype.Delete = function (id) {
                return this.ApiService.delete(id).HandleError();
            };
            /**
             * Вызывает всплывающий диалог для редактирования объекта.
             * В случае закрытия диалога по кнопке OK сохраняет изменения.
             * Объект доступен в скоупе диалога как $item.
             * Дополнительно можно передать свой скоуп, который будет доступен в скоупе диалога как $scope.
             * Также из исходного скоупа будут скопированы в скоуп диалога все поля, начинающиеся на $.
             * В контроллере дополнительного скоупа могут быть реализованы методы, которые будут автоматически вызваны в нужный момент:
             *     PrepareSave($item): IPromise<boolean> | boolean - вызывается ПЕРЕД сохранением объекта. Если возвращает false - автоматическое сохранение не вызовется.
             * Стандартный алгоритм сохранения может быть полностью перекрыт, если в переданном скоупе будет реализован метод
             *     $submit($item): IPromise<boolean>
             * Возвращает промис окончания сохранения объекта.
             * @param entity редактируемый объект
             * @param editTemplateUrl ссылка на шаблон формы редактирования
             * @param scope ссылка на скоуп
             * @param updateAfterSave нужно ли обновлять объект после сохраниения. По умолчанию - true.
             */
            CRUDService.prototype.EditModal = function (entity, editTemplateUrl, scope, updateAfterSave) {
                var _this = this;
                entity = entity || {};
                scope = scope || App.app.$rootScope;
                if (scope && scope.__customController) {
                    scope.$item = angular.copy(entity);
                    scope.$.$item = scope.$item;
                    if (!scope.$templateUrl)
                        scope.$templateUrl = editTemplateUrl.ExpandPath(LionSoftAngular.popupDefaults.templateUrlBase);
                    if (!scope.$entityTypeName)
                        scope.$entityTypeName = this.TypeDescription;
                }
                else {
                    // ReSharper disable once QualifiedExpressionMaybeNull
                    scope = scope.$new();
                    scope.$item = angular.copy(entity);
                    scope.$templateUrl = editTemplateUrl.ExpandPath(LionSoftAngular.popupDefaults.templateUrlBase);
                    scope.$entityTypeName = this.TypeDescription;
                }
                if (!scope.$submit) {
                    scope.$submit = function (item) {
                        var needSave = true;
                        if (typeof scope.$.PrepareSave === "function")
                            needSave = scope.$.PrepareSave(item);
                        if (needSave === undefined)
                            needSave = true;
                        if (needSave) {
                            return _this.Save(item).then(function (res) {
                                scope.$item = res;
                                return true;
                            });
                        }
                        else {
                            scope.$item = item;
                        }
                        return _this.promiseFromResult(true);
                    };
                }
                var res = App.app.popup.popupModal("html/edit-form.html".ExpandPath(LionSoftAngular.rootFolder), scope)
                    .then(function () { return scope.$item; });
                /*
                                .then(() => {
                                    var needSave = true;
                                    if (typeof scope['$'].PrepareSave === "function")
                                        needSave = scope['$'].PrepareSave(scope['$item']);
                                    if (needSave === undefined)
                                        needSave = true;
                                    return needSave;
                                })
                                .then(r => {
                                    if (r)
                                        return this.Save(scope['$item']);
                                    else
                                        return scope['$item'];
                                });
                */
                if (updateAfterSave === undefined || updateAfterSave) {
                    res = res
                        .then(function (res) { return _this.Load(res.Id); })
                        .then(function (res) { return _this.Update(entity, res); });
                }
                return res;
            };
            /**
             * Вызывает всплывающий диалог для удаления объекта.
             * В случае закрытия диалога по кнопке YES - удаляет объект из базы и вызывает промис.
             * @param entity удаляемый объект
             */
            CRUDService.prototype.DeleteModal = function (entity) {
                var _this = this;
                var def = this.defer();
                if (!entity || !entity.Id) {
                    def.reject();
                }
                else {
                    App.app.popup.ask(this.$filter('translate')("AskDelete").format(this.TypeDescription.toLocaleLowerCase(), "<strong>" + this.GetDescription(entity) + "</strong>"), false)
                        .then(function (r) { return r ? _this.Delete(entity.Id) : false; })
                        .then(function (r) {
                        if (r)
                            def.resolve();
                        else
                            def.reject();
                    })
                        .catch(function (r) { return def.reject(r); });
                }
                return def.promise;
            };
            return CRUDService;
        }(App.Service));
        Services.CRUDService = CRUDService;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=CRUDService.js.map
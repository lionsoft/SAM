'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// ReSharper disable InconsistentNaming
var App;
(function (App) {
    var ApiServiceBase = (function (_super) {
        __extends(ApiServiceBase, _super);
        function ApiServiceBase() {
            _super.apply(this, arguments);
        }
        /**
         * Выделяет ошибку из ответа серевера, возникшую при вызове методов сервиса.
         */
        ApiServiceBase.ExctractError = function (err) {
            var error = (err || "Fatal error").toString();
            if (typeof err.data === "object") {
                if (typeof err.data.ModelState === "object")
                    error = err.data.ModelState[""];
                else
                    error = (err.data.ExceptionMessage == undefined) ? err.data.Message : err.data.ExceptionMessage;
                if (!error && err.data.result && typeof err.data.result === "object") {
                    error = (err.data.result.ExceptionMessage == undefined) ? err.data.result.Message : err.data.result.ExceptionMessage;
                }
            }
            else if (err.statusText != undefined) {
                error = err.statusText.toString();
            }
            else if (err.data != undefined) {
                error = err.data.toString().substr(0, 100);
            }
            return error;
        };
        /**
         * Обрабатывает ошибку, возникшую при вызове методов сервиса.
         */
        ApiServiceBase.HandleError = function (err) {
            var error = this.ExctractError(err);
            //alert(error);
            App.app.popup.error(error);
        };
        ApiServiceBase.addFactoryInjections = function (injects) {
            LionSoftAngular.Service.addFactoryInjections(injects);
            this.addInjection(injects, "$location");
        };
        ApiServiceBase.prototype.transformServiceResponse = function (data, headers) {
            // Copied from Angular default transform method
            if (angular.isString(data)) {
                // Strip json vulnerability protection prefix and trim whitespace
                var tempData = data.replace(App.Utils.Json.JSON_PROTECTION_PREFIX, '').trim();
                if (tempData) {
                    var contentType = headers('Content-Type');
                    if ((contentType && (contentType.indexOf(App.Utils.Json.APPLICATION_JSON) === 0)) || App.Utils.Json.IsJsonLike(tempData)) {
                        data = App.Utils.Json.ResolveReferences(angular.fromJson(tempData));
                    }
                }
            }
            if (!angular.isObject(data))
                data = { result: data };
            return data;
        };
        ApiServiceBase.prototype.configServiceResult = function (res) {
            var _this = this;
            if (res.$promise != undefined) {
                res = res.$promise;
            }
            var newRes = this.defer();
            res.then(function (r) {
                if (r.result !== undefined)
                    newRes.resolve(r.result);
                else {
                    // Когда приходит в ответ null - r равен пустому промису - это нужно проверить и вернуть null
                    if (r && !r.length && r.$promise && r.$resolved && Enumerable.from(r).count() === 2)
                        newRes.resolve(null);
                    else
                        newRes.resolve(r);
                }
            })
                .catch(function (reason) {
                if (reason.status === 401) {
                    // Ошибка авторизации - перекидываем на страницу логина
                    _this.$location.path("/login");
                }
                else {
                    newRes.reject(reason);
                }
            });
            var result = newRes.promise;
            /*
                        result.HandleError = () => {
                            result.catch(reason => ApiServiceBase.HandleError(reason));
                            return result;
                        };
                        result.ExtractError = () => {
                            var newRes1 = this.defer();
                            result
                                .then(r => newRes1.resolve(r))
                                .catch(reason => newRes1.reject(ApiServiceBase.ExctractError(reason)));
                            return newRes1.promise;
                        };
            */
            return result;
        };
        ApiServiceBase.prototype.configServiceFactory = function (serviceFactory, methodName, paramNames) {
            if (!serviceFactory["__" + methodName])
                serviceFactory["__" + methodName] = serviceFactory[methodName];
            var _this = this;
            // ReSharper disable once Lambda
            serviceFactory[methodName] = function () {
                var defaultParamNames = paramNames ? (paramNames[methodName] || paramNames["$default"]) : undefined;
                var args = [];
                var params = {};
                // Если первым параметром передан объект OData - превращаем его в строку параметров
                if (arguments.length > 0 && arguments[0] instanceof App.Services.OData) {
                    arguments[0] = arguments[0].query;
                }
                /*
                                for (let i = 0; i < arguments.length; i++) {
                                    if (arguments[i] instanceof Services.OData) {
                                        var query = arguments[i].query;
                                        if (query)
                                            arguments[i] = query.replace(/(^\?)/, "").split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1].trim(), this; }.bind({}))[0];
                                    }
                                }
                */
                // Преобразование строки параметров в объект
                // ReSharper disable SuspiciousThisUsage
                if (arguments.length > 0 && typeof arguments[0] == "string" && (arguments[0].StartsWith("?") || arguments[0].StartsWith("&") || arguments[0].StartsWith("$"))) {
                    params = arguments[0].replace(/(^\?)/, "").split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1].trim(), this; }.bind({}))[0];
                    args.push(params);
                }
                else if (arguments.length > 0 && typeof arguments[0] !== "object") {
                    // По умолчанию будем считать, что есть как минимум один параметр с наименованием id.
                    if ((!defaultParamNames || defaultParamNames.length === 0) && (methodName === "get" || methodName === "delete")) {
                        defaultParamNames = ["id"];
                    }
                    var stop = false;
                    args.push(params);
                    for (var idx in arguments) {
                        if (arguments.hasOwnProperty(idx)) {
                            var arg = arguments[idx];
                            stop = stop || idx >= defaultParamNames.length || typeof arguments[0] === "object" || typeof arguments[0] === "function";
                            if (stop)
                                args.push(arg);
                            else {
                                var paramName = defaultParamNames[idx];
                                params[paramName] = arg;
                            }
                        }
                    }
                }
                var oldResult = serviceFactory["__" + methodName].apply(_this, args.length === 0 ? arguments : args);
                // Преобразование старого результата в нормальный промис
                return _this.configServiceResult(oldResult);
            };
        };
        /**
         * Преобразует методы класса ng.resources.IResourceClass, которые работают через вызов метода обратного вызова
         * в методы класса App.IResourceClass которые возвращают промисы.
         */
        ApiServiceBase.prototype.configService = function (serviceFactory, paramNames) {
            // Автоматически исправляем все методы сервиса для того, чтобы они возвращали промис
            // Кроме метода bind - это внутренний метод.
            for (var methodName in serviceFactory) {
                if (serviceFactory.hasOwnProperty(methodName) && methodName !== "bind" && !methodName.StartsWith("__")) {
                    this.configServiceFactory(serviceFactory, methodName, paramNames);
                }
            }
            return serviceFactory;
        };
        ApiServiceBase.prototype.Init = function (baseUrl) {
            var _this = this;
            var self = this;
            Enumerable.from(this)
                .where(function (x) { return !x.key.StartsWith("_")
                && !x.key.StartsWith("$")
                && x.key !== "ngName"
                && x.key !== "ng"; })
                .forEach(function (x) {
                var paramNames = { $default: ["id"] };
                //var urlBase = "{0}/{1}/".format(self.baseUrl, x.key);
                var urlBase = "{0}/{1}/".format(baseUrl, x.key);
                var methods = {
                    // Добавляем стандартные методы
                    head: { method: "HEAD", transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); } },
                    // получение списка объектов
                    query: {
                        method: "GET",
                        isArray: true,
                        transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); }
                    },
                    // получение  объекта по его Id
                    get: { method: "GET", transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); } },
                    // создание нового объекта
                    create: { method: "POST", transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); } },
                    // изменение существующего объекта. Поле Id должно быть заполнено. В противном случае или если объект не найден в базе - ошибка
                    update: { method: "PUT", transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); } },
                    // удаление объекта по его Id
                    delete: { method: "DELETE", transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); } },
                    // удаление объекта по его Id
                    remove: { method: "DELETE", transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); } },
                    // сохранение объекта. Если Id заполнено и такой объект есть в базе равносильно Update. В противном случае - Create.
                    save: { method: "PATCH", transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); } },
                    // сохранение объекта. Если Id заполнено и такой объект есть в базе равносильно Update. В противном случае - Create.
                    patch: { method: "PATCH", transformResponse: function (data, headers) { return _this.transformServiceResponse(data, headers); } }
                };
                // Добавляем дополнительные методы
                for (var method in x.value) {
                    if (x.value.hasOwnProperty(method)) {
                        var action = x.value[method];
                        if (!action.url)
                            action.url = "{0}{1}".format(urlBase, action.route || "");
                        action.route = undefined;
                        // Заполняем параметры
                        if (action.params) {
                            paramNames[method] = [];
                            for (var paramName in action.params) {
                                if (action.params.hasOwnProperty(paramName)) {
                                    paramNames[method].push(paramName);
                                }
                            }
                        }
                        else {
                            paramNames[method] = action.url.split(/:([\w]+)/).where(function (p) { return p && p[0] !== '/'; }).toArray();
                        }
                        if (action.transformResponse) {
                            var saved = action.transformResponse;
                            action.transformResponse = function (data, headers) {
                                // ReSharper disable once ClosureOnModifiedVariable
                                var res = App.Utils.Json.ResolveReferences(saved(data, headers));
                                if (!angular.isObject(res))
                                    res = { result: res };
                                return res;
                            };
                        }
                        else
                            action.transformResponse = function (data, headers) { return _this.transformServiceResponse(data, headers); };
                        methods[method] = action;
                    }
                }
                var service = _this.configService(self.$resource("{0}:id".format(urlBase), {}, methods), paramNames);
                self[x.key] = service;
            });
        };
        return ApiServiceBase;
    })(LionSoftAngular.Service);
    App.ApiServiceBase = ApiServiceBase;
})(App || (App = {}));
//# sourceMappingURL=ApiServiceBase.js.map
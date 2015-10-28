'use strict';
var App;
(function (App) {
    var Services;
    (function (Services) {
        var OData = (function () {
            /**
             * Создаёт объект OData
             */
            function OData(params) {
                this._expands = [];
                this._filter = "";
                this._orderBy = [];
                this._extra = [];
                this.clear();
                if (params) {
                    if (params.$expand)
                        this._expands = params.$expand.split(',').select(function (s) { return (s || "").trim(); }).where(function (s) { return s !== ""; }).toArray();
                    this._filter = (params.$filter || "").trim();
                    if (params.$orderBy)
                        this._orderBy = params.$orderBy.split(',').select(function (s) { return (s || "").trim(); }).where(function (s) { return s !== ""; }).toArray();
                    this._top = params.$top;
                    this._skip = params.$skip;
                    if (params.$extra)
                        this._extra = params.$extra.split('&').select(function (s) { return (s || "").trim(); }).where(function (s) { return s !== ""; }).toArray();
                }
            }
            Object.defineProperty(OData, "create", {
                /**
                 * То же самое, что и конструктор - создаёт объект OData
                 */
                get: function () {
                    return new OData();
                },
                enumerable: true,
                configurable: true
            });
            OData.prototype.toString = function () {
                return this.query;
            };
            /**
             * Очищает все заданные параметры
             */
            OData.prototype.clear = function () {
                this.prop(undefined);
                this._expands = [];
                this._filter = "";
                this._orderBy = [];
                this._top = undefined;
                this._skip = undefined;
                this._extra = [];
            };
            Object.defineProperty(OData.prototype, "query", {
                /**
                 * Возвращает строковое значение запроса.
                 */
                get: function () {
                    // update filter from current filter creator
                    this.prop(undefined);
                    if (this.$empty)
                        return "$top=0&$filter=1 eq 0";
                    var resArray = [];
                    if (angular.isArray(this._expands) && this._expands.length > 0)
                        resArray.push("$expand=" + this._expands.distinct().select(function (x) { return x.trim().replace(/\./g, '/'); }).toJoinedString(','));
                    if (this._filter)
                        resArray.push("$filter=" + this._filter);
                    if (angular.isArray(this._orderBy) && this._orderBy.length > 0)
                        resArray.push("$orderby=" + this._orderBy.distinct().toJoinedString(','));
                    if (this._top || this._top === 0)
                        resArray.push("$top=" + this._top);
                    if (this._skip)
                        resArray.push("$skip=" + this._skip);
                    if (angular.isArray(this._extra) && this._extra.length > 0)
                        resArray.push(this._extra.distinct().toJoinedString('&'));
                    var res = resArray.distinct().toJoinedString('&');
                    return res;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * При использовании фильтров по перечислениям необходимо использовать эту функцию,
             * для того, чтобы задать значение перечисления.
             * @param enumName полное название перечисления. Если задано коротуое (без точек) - к нему будет добавлен префикс NavisWeb.Models.
             * @param enumValue числовое значение перечисления
             */
            OData.enum = function (enumName, enumValue) {
                return enumValue === undefined ? undefined : new ODataEnum(enumName, enumValue);
            };
            /**
             * Добавляет к запросу параметр для получения общего количества записей в запросе (без учёта $top и $skip).
             * Результатом запроса будет не массив сущностей, а массив из одного элемента IODataMetadata.
             */
            OData.prototype.$inlinecount = function () {
                this._extra.push("$inlinecount=allpages");
                return this;
            };
            OData.prototype.$expand = function (p1) {
                var value = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    value[_i - 1] = arguments[_i];
                }
                var addExpand = true;
                if (p1 === undefined || typeof p1 === "boolean") {
                    addExpand = p1;
                }
                else {
                    if (p1)
                        value.push(p1.toString());
                }
                if (addExpand) {
                    for (var _a = 0; _a < value.length; _a++) {
                        var item = value[_a];
                        item = (item || "").trim();
                        if (item) {
                            for (var _b = 0, _c = item.split(','); _b < _c.length; _b++) {
                                var s = _c[_b];
                                s = (s || "").trim().replace(/\./g, '/');
                                if (s && !this._expands.contains(s))
                                    this._expands.push(s);
                            }
                        }
                    }
                }
                return this;
            };
            /**
             * Добавляет к запросу перечень названий полей, по которым неободимо отсортировать запрос.
             * Сортировка производится в порядке добавления полей.
             * Для обратной сортировки следует к имени поля дописать desc.
             *
             * Пример:
             *      $orderBy('field1', 'field2 desc', 'Category/Name desc');
             */
            OData.prototype.$orderBy = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i - 0] = arguments[_i];
                }
                this._orderBy = [];
                if (value && value[0] !== undefined) {
                    for (var _a = 0; _a < value.length; _a++) {
                        var item = value[_a];
                        item = (item || "").trim();
                        if (item) {
                            for (var _b = 0, _c = item.split(','); _b < _c.length; _b++) {
                                var s = _c[_b];
                                s = (s || "").trim().replace(/\./g, '/');
                                if (s && !this._orderBy.contains(s))
                                    this._orderBy.push(s);
                            }
                        }
                    }
                }
                return this;
            };
            /**
             * Указывает количество записей, возвращаемых с сервера.
             */
            OData.prototype.$top = function (value) {
                this._top = value;
                return this;
            };
            /**
             * Указывает количество пропускаемых записей, возвращаемых с сервера.
             */
            OData.prototype.$skip = function (value) {
                this._skip = value;
                return this;
            };
            /**
             * Добавляет условие отбора по ключевому полю Id.
             * @param value Значение ключевого поля
             */
            OData.prototype.$id = function (value) {
                if (value !== undefined)
                    this.prop("Id").eq(value);
                return this;
            };
            /**
             * Добавляет условие отбора 'равно' по указанному полю.
             */
            OData.prototype.eq = function (propName, value, isEnum) {
                if (value !== undefined)
                    this.prop(propName).eq(isEnum ? value.toString() : value);
                return this;
            };
            /**
             * Добавляет условие отбора 'не равно' по указанному полю.
             */
            OData.prototype.ne = function (propName, value, isEnum) {
                if (value !== undefined)
                    this.prop(propName).ne(isEnum ? value.toString() : value);
                return this;
            };
            /**
             * Добавляет условие отбора 'больше' по указанному полю.
             */
            OData.prototype.gt = function (propName, value, isEnum) {
                if (value !== undefined)
                    this.prop(propName).gt(isEnum ? value.toString() : value);
                return this;
            };
            /**
             * Добавляет условие отбора 'больше или равно' по указанному полю.
             */
            OData.prototype.ge = function (propName, value, isEnum) {
                if (value !== undefined)
                    this.prop(propName).ge(isEnum ? value.toString() : value);
                return this;
            };
            /**
             * Добавляет условие отбора 'меньше' по указанному полю.
             */
            OData.prototype.lt = function (propName, value, isEnum) {
                if (value !== undefined)
                    this.prop(propName).lt(isEnum ? value.toString() : value);
                return this;
            };
            /**
             * Добавляет условие отбора 'меньше или равно' по указанному полю.
             */
            OData.prototype.le = function (propName, value, isEnum) {
                if (value !== undefined)
                    this.prop(propName).le(isEnum ? value.toString() : value);
                return this;
            };
            OData.prototype.$filter = function (p1, p2) {
                var op = p1;
                var filter = p2;
                if (filter === undefined) {
                    op = "and";
                    filter = p1;
                }
                if (filter) {
                    if (!this._filter)
                        this._filter = filter;
                    else if (op === "and")
                        this._filter = this._filter + " " + op + " " + filter;
                    else
                        this._filter = this._filter + " " + op + " (" + filter + ")";
                }
                else
                    this._filter = undefined;
                return this;
            };
            OData.prototype.prop = function (propName) {
                if (this._filterCreator) {
                    var query = this._filterCreator.query;
                    if (query)
                        this.$filter('and', query);
                }
                if (propName) {
                    this._filterCreator = new Services.ODataFilterCreator(propName);
                }
                else {
                    this._filterCreator = undefined;
                }
                return this._filterCreator;
            };
            /**
             * Usage:
             *
             * odata.prop('a').eq(1);
             * odata.and(odata.prop('b').eq(2).or('c).eq(3));
             *
             * This code will generate $filter=a eq 1 and (b eq 2 or c eq 3)
             *
             */
            OData.prototype.and = function (odataOperation) {
                if (odataOperation) {
                    var query = odataOperation.query;
                    if (query)
                        this.$filter('and', "(" + query + ")");
                }
                this._filterCreator = undefined;
                return this;
            };
            return OData;
        })();
        Services.OData = OData;
        var ODataEnum = (function () {
            function ODataEnum(name, value) {
                this.name = name;
                this.value = value;
                if (!this.name.Contains('.'))
                    this.name = 'Sam.DbContext.' + this.name;
            }
            ODataEnum.prototype.toString = function () {
                return this.name + "'" + this.value + "'";
            };
            return ODataEnum;
        })();
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));

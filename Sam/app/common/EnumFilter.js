var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    /**
     * Наследуйте фильтры, которые обрабатываеют перечисления от этого класса.
     *
     * В классе наследнике достаточно только указать массив значений перечисления и их ключи локализации в качестве описания.
     *
     * В разметке фильтр используется преобразования значения перечисления в его локализованное описание:
     *    <span>{{enumValue | myEnumFilter}}</span>
     *
     * а также для получения списка элементов перечисления:
     *
     *    <ul ng-repeat='enumValue in [] | myEnumFilter'>
     *        <li>{{enumValue | myEnumFilter}}</li>
     *    </ul>
     *
     */
    var EnumFilter = (function (_super) {
        __extends(EnumFilter, _super);
        function EnumFilter() {
            _super.apply(this, arguments);
        }
        EnumFilter.prototype.Execute = function (value) {
            var _this = this;
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (value === undefined)
                return "";
            if (angular.isArray(value)) {
                return this.Source.select(function (k) { return k.Key; }).toArray();
            }
            else {
                return this.Source.where(function (k) { return k.Key == value; }).select(function (k) { return _this.Translate(k.Value); }).firstOrDefault();
            }
        };
        return EnumFilter;
    }(App.Filter));
    App.EnumFilter = EnumFilter;
})(App || (App = {}));
//# sourceMappingURL=EnumFilter.js.map
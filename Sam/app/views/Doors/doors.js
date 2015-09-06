'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Doors = (function (_super) {
            __extends(Doors, _super);
            function Doors() {
                _super.apply(this, arguments);
                this.countries = [];
                this.cities = [];
                this.buildings = [];
                this.areas = [];
            }
            //#endregion
            Doors.prototype.Init = function () {
                var _this = this;
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.LoadCountries());
                this.samUsers.Load().then(function (res) { return _this.owners = res; });
            };
            Doors.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.countries", function () { return _this.selectedCountry = _this.countries.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.cities", function () { return _this.selectedCity = _this.cities.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.buildings", function () { return _this.selectedBuilding = _this.buildings.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.selectedCountry", function () { return _this.LoadCities(); });
                this.$scope.$watch("$.selectedCity", function () { return _this.LoadBuildings(); });
                this.$scope.$watch("$.selectedBuilding", function () { return _this.LoadAreas(); });
            };
            //#region - Country -
            Doors.prototype.LoadCountries = function () {
                var _this = this;
                this.countries = [];
                return this.$timeout(function () {
                    return _this.samCountries.Load().then(function (res) { return _this.countries = res; });
                });
            };
            Doors.prototype.AddCountry = function () {
                var _this = this;
                this.samCountries.EditModal(null, '_editCountry.html').then(function (res) { return _this.countries.push(res); });
            };
            Doors.prototype.EditCountry = function (c) { this.samCountries.EditModal(c, '_editCountry.html'); };
            Doors.prototype.DeleteCountry = function (c) {
                var _this = this;
                this.samCountries.DeleteModal(c).then(function () { return _this.countries.Remove(c); });
            };
            //#endregion 
            //#region - City -
            Doors.prototype.LoadCities = function () {
                var _this = this;
                this.cities = [];
                this.$timeout(function () {
                    if (_this.selectedCountry)
                        _this.samCities.Load(App.Services.OData.create.eq("CountryId", _this.selectedCountry.Id)).then(function (res) {
                            _this.cities = res;
                        });
                });
            };
            Doors.prototype.AddCity = function () {
                var _this = this;
                this.samCities.EditModal({ CountryId: this.selectedCountry.Id }, '_editCity.html').then(function (res) { return _this.cities.push(res); });
            };
            Doors.prototype.EditCity = function (c) { this.samCities.EditModal(c, '_editCity.html'); };
            Doors.prototype.DeleteCity = function (c) {
                var _this = this;
                this.samCities.DeleteModal(c).then(function () { return _this.cities.Remove(c); });
            };
            //#endregion 
            //#region - Building -
            Doors.prototype.LoadBuildings = function () {
                var _this = this;
                this.buildings = [];
                this.$timeout(function () {
                    if (_this.selectedCity)
                        _this.samBuildings.Load(App.Services.OData.create.eq("CityId", _this.selectedCity.Id)).then(function (res) {
                            _this.buildings = res;
                        });
                });
            };
            Doors.prototype.AddBuilding = function () {
                var _this = this;
                this.samBuildings.EditModal({ CityId: this.selectedCity.Id }, '_editBuilding.html', this.$scope).then(function (res) { return _this.buildings.push(res); });
            };
            Doors.prototype.EditBuilding = function (b) { this.samBuildings.EditModal(b, '_editBuilding.html', this.$scope); };
            Doors.prototype.DeleteBuilding = function (b) {
                var _this = this;
                this.samBuildings.DeleteModal(b).then(function () { return _this.buildings.Remove(b); });
            };
            //#endregion 
            //#region - Area -
            Doors.prototype.LoadAreas = function () {
                var _this = this;
                this.areas = [];
                this.$timeout(function () {
                    if (_this.selectedBuilding)
                        _this.samAreas.Load(App.Services.OData.create.eq("BuildingId", _this.selectedBuilding.Id)).then(function (res) {
                            _this.areas = res;
                        });
                });
            };
            Doors.prototype.AddArea = function () {
                var _this = this;
                this.samAreas.EditModal({ BuildingId: this.selectedBuilding.Id }, '_editArea.html', this.$scope).then(function (res) { return _this.areas.push(res); });
            };
            Doors.prototype.EditArea = function (a) { this.samAreas.EditModal(a, '_editArea.html', this.$scope); };
            Doors.prototype.DeleteArea = function (a) {
                var _this = this;
                this.samAreas.DeleteModal(a).then(function () { return _this.areas.Remove(a); });
            };
            return Doors;
        })(App.Controller);
        // register controller with angular
        App.app.controller('doors', Doors.Factory("samCountries", "samCities", "samBuildings", "samAreas", "samUsers"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=doors.js.map
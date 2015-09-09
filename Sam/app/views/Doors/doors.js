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
                this.doors = [];
                this.customers = [];
            }
            //#endregion
            Doors.prototype.Init = function () {
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.LoadCustomers(), this.LoadCountries());
            };
            Doors.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.selectedCustomerId", function () { return _this.CustomerChanged(); });
                this.$scope.$watch("$.countries", function () { return _this.selectedCountry = _this.countries.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.cities", function () { return _this.selectedCity = _this.cities.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.buildings", function () { return _this.selectedBuilding = _this.buildings.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.areas", function () {
                    _this.selectedArea = _this.areas.orderBy(function (x) { return x.Name; }).firstOrDefault();
                });
                this.$scope.$watch("$.selectedCountry", function () { return _this.LoadCities(); });
                this.$scope.$watch("$.selectedCity", function () { return _this.LoadBuildings(); });
                this.$scope.$watch("$.selectedBuilding", function () { return _this.LoadAreas(); });
                this.$scope.$watch("$.selectedArea", function () {
                    _this.LoadDoors();
                });
            };
            Doors.prototype.LoadCustomers = function () {
                var _this = this;
                return this.samCustomers.Load().then(function (res) {
                    _this.customers = res.orderBy(function (x) { return x.Name; }).toArray();
                    _this.selectedCustomerId = res.select(function (x) { return x.Id; }).firstOrDefault();
                });
            };
            Doors.prototype.CustomerChanged = function () {
                this.LoadOwners(this.selectedCustomerId);
            };
            Doors.prototype.LoadOwners = function (customerId) {
                var _this = this;
                this.buildingOwners = [];
                this.areaOwners = [];
                this.doorOwners = [];
                if (customerId) {
                    this.samEmployees.LoadByCustomer(customerId).then(function (res) {
                        _this.buildingOwners = res.where(function (x) { return x.UserRole === 2 /* BuildingOwner */; }).toArray();
                        _this.areaOwners = res.where(function (x) { return x.UserRole === 4 /* AreaOwner */; }).toArray();
                        _this.doorOwners = res.where(function (x) { return x.UserRole === 8 /* DoorOwner */; }).toArray();
                    });
                }
                this.LoadBuildings();
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
                if (!this.selectedCustomerId)
                    return;
                this.$timeout(function () {
                    if (_this.selectedCity)
                        _this.samBuildings.Load(App.Services.OData.create
                            .eq("CityId", _this.selectedCity.Id)
                            .eq("CustomerId", _this.selectedCustomerId))
                            .then(function (res) {
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
            //#endregion 
            //#region - Door -
            Doors.prototype.LoadDoors = function () {
                var _this = this;
                this.doors = [];
                this.$timeout(function () {
                    if (_this.selectedArea)
                        _this.samDoors.Load(App.Services.OData.create.eq("AreaId", _this.selectedArea.Id)).then(function (res) {
                            _this.doors = res;
                        });
                });
            };
            Doors.prototype.AddDoor = function () {
                var _this = this;
                this.samDoors.EditModal({ AreaId: this.selectedArea.Id }, '_editDoor.html', this.$scope).then(function (res) { return _this.doors.push(res); });
            };
            Doors.prototype.EditDoor = function (d) {
                this.samDoors.EditModal(d, '_editDoor.html', this.$scope);
            };
            Doors.prototype.DeleteDoor = function (d) {
                var _this = this;
                this.samDoors.DeleteModal(d).then(function () { return _this.doors.Remove(d); });
            };
            return Doors;
        })(App.Controller);
        // register controller with angular
        App.app.controller('doors', Doors.Factory("samCustomers", "samCountries", "samCities", "samBuildings", "samAreas", "samDoors", "samEmployees"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=doors.js.map
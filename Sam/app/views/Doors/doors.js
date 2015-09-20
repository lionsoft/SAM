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
                this.customers = [];
            }
            //#endregion
            Doors.prototype.Init = function () {
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.LoadCustomers() /*, this.LoadCountries()*/);
            };
            Doors.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.selectedCustomerId", function () { return _this.CustomerChanged(); });
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
            };
            //#region - Country -
            Doors.prototype.CountriesLoaded = function (list) {
                this.selectedCountryId = list.select(function (x) { return x.Id; }).firstOrDefault();
            };
            //#endregion 
            //#region - City -
            Doors.prototype.prepareCitiesQuery = function (odata) {
                odata.eq("CountryId", this.selectedCountryId);
                return "selectedCountryId";
            };
            Doors.prototype.prepareCityEdit = function (city) {
                if (!city.Id)
                    city.CountryId = this.selectedCountryId;
            };
            Doors.prototype.CitiesLoaded = function (list) {
                this.selectedCityId = list.select(function (x) { return x.Id; }).firstOrDefault();
            };
            //#endregion 
            //#region - Building -
            Doors.prototype.prepareBuildingsQuery = function (odata) {
                odata.eq("CityId", this.selectedCityId).eq("CustomerId", this.selectedCustomerId);
                return "selectedCityId,selectedCustomerId";
            };
            Doors.prototype.prepareBuildingEdit = function (building) {
                if (!building.Id) {
                    building.CityId = this.selectedCityId;
                    building.CustomerId = this.selectedCustomerId;
                }
            };
            Doors.prototype.BuildingsLoaded = function (list) {
                this.selectedBuildingId = list.select(function (x) { return x.Id; }).firstOrDefault();
            };
            //#endregion 
            //#region - Area -
            Doors.prototype.prepareLoadAreasQuery = function (odata) {
                odata.eq("BuildingId", this.selectedBuildingId);
                return "selectedBuildingId";
            };
            Doors.prototype.prepareAreaEdit = function (area) {
                if (!area.Id) {
                    area.BuildingId = this.selectedBuildingId;
                }
            };
            Doors.prototype.AreasLoaded = function (list) {
                this.selectedAreaId = list.select(function (x) { return x.Id; }).firstOrDefault();
            };
            //#endregion 
            //#region - Door -
            Doors.prototype.prepareLoadDoorsQuery = function (odata) {
                odata.eq("AreaId", this.selectedAreaId);
                return "selectedAreaId";
            };
            Doors.prototype.prepareDoorEdit = function (door) {
                if (!door.Id) {
                    door.AreaId = this.selectedAreaId;
                }
            };
            return Doors;
        })(App.Controller);
        // register controller with angular
        App.app.controller('doors', Doors.Factory("samCustomers", "samEmployees"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=doors.js.map
'use strict';
module App.Controllers
{
    class Doors extends PageController
    {
        samEmployees: Services.IEmployeesService;
        samCustomers: Services.ICustomersService;

        public selectedCountryId: string;
        public selectedCityId: string;
        public selectedBuildingId: string;
        public selectedAreaId: string;

        public selectedCustomerId: string;
        public customers: ICustomer[] = [];

        // for edit dialogs
        public buildingOwners: IEmployee[];
        public areaOwners: IEmployee[];
        public doorOwners: IEmployee[];



        Init() {
            this.activate(this.LoadCustomers());
        }

        Activated() {
            this.$scope.$watch("$.selectedCustomerId", () => this.CustomerChanged());
        }

        LoadCustomers(): IPromise<any> {
            return this.samCustomers.Load().then(res => {
                this.customers = res.orderBy(x => x.Name).toArray();
                this.selectedCustomerId = res.select(x => x.Id).firstOrDefault();
            });
        }

        CustomerChanged() {
            this.LoadOwners(this.selectedCustomerId);
        }

        LoadOwners(customerId: string) {
            this.buildingOwners = [];
            this.areaOwners = [];
            this.doorOwners = [];
            if (customerId) {
                this.samEmployees.LoadByCustomer(customerId).then(res => {
                    this.buildingOwners = res.where(x => x.UserRole === UserRole.BuildingOwner).toArray();
                    this.areaOwners = res.where(x => x.UserRole === UserRole.AreaOwner).toArray();
                    this.doorOwners = res.where(x => x.UserRole === UserRole.DoorOwner).toArray();
                });
            }
        }


        //#region - Country -

        CountriesLoaded(list: ICountry[]) {
            this.selectedCountryId = list.select(x => x.Id).firstOrDefault();
        }

        //#endregion 

        //#region - City -

        prepareCitiesQuery(odata: Services.OData) {
            odata.eq("CountryId", this.selectedCountryId);
            return "selectedCountryId";
        }
        prepareCityEdit(city: ICity) {
            if (!city.Id)
                city.CountryId = this.selectedCountryId;
        }
        CitiesLoaded(list: ICity[]) {
            this.selectedCityId = list.select(x => x.Id).firstOrDefault();
        }

        //#endregion 

        //#region - Building -

        prepareBuildingsQuery(odata: Services.OData) {
            odata.eq("CityId", this.selectedCityId).eq("CustomerId", this.selectedCustomerId);
            return "selectedCityId,selectedCustomerId";
        }
        prepareBuildingEdit(building: IBuilding) {
            if (!building.Id) {
                building.CityId = this.selectedCityId;
                building.CustomerId = this.selectedCustomerId;
            }
        }
        BuildingsLoaded(list: IBuilding[]) {
            this.selectedBuildingId = list.select(x => x.Id).firstOrDefault();
        }

        //#endregion 

        //#region - Area -

        prepareLoadAreasQuery(odata: Services.OData) {
            odata.eq("BuildingId", this.selectedBuildingId);
            return "selectedBuildingId";
        }
        prepareAreaEdit(area: IArea) {
            if (!area.Id) {
                area.BuildingId = this.selectedBuildingId;
            }
        }
        AreasLoaded(list: IArea[]) {
            this.selectedAreaId = list.select(x => x.Id).firstOrDefault();
        }

        //#endregion 

        //#region - Door -

        prepareLoadDoorsQuery(odata: Services.OData) {
            odata.eq("AreaId", this.selectedAreaId);
            return "selectedAreaId";
        }
        prepareDoorEdit(door: IDoor) {
            if (!door.Id) {
                door.AreaId = this.selectedAreaId;
                door.PreApproved = true;
                door.ApprovalLevel = ApprovalLevel.Manager;
            }
        }

        //#endregion 
    }

    // register controller with angular
    app.controller('doors', Doors.Factory("samCustomers", "samEmployees"));
}
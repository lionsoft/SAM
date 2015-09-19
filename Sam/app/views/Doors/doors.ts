'use strict';
module App.Controllers
{
    class Doors extends Controller
    {
        //#region Variables

        samCountries: Services.ICountriesService;
        samCities: Services.ICitiesService;
        samBuildings: Services.IBuildingsService;
        samAreas: Services.IAreasService;
        samDoors: Services.IDoorsService;
        samEmployees: Services.IEmployeesService;
        samCustomers: Services.ICustomersService;

        public selectedCountry: ICountry;
        public countries: ICountry[] = [];

        public selectedCity: ICity;
        public cities: ICity[] = [];

        public selectedBuilding: IBuilding;
        public buildings: IBuilding[] = [];

        public selectedArea: IArea;
        public areas: IArea[] = [];
        public doors: IDoor[] = [];

        public customers: ICustomer[] = [];
        public selectedCustomerId: string;

        // for edit dialogs
        public buildingOwners: IEmployee[];
        public areaOwners: IEmployee[];
        public doorOwners: IEmployee[];


        //#endregion

        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(this.LoadCustomers(), this.LoadCountries());
        }

        Activated() {
            this.$scope.$watch("$.selectedCustomerId", () => this.CustomerChanged());

            this.$scope.$watch("$.countries", () => this.selectedCountry = this.countries.orderBy(x => x.Name).firstOrDefault());
            this.$scope.$watch("$.cities", () => this.selectedCity = this.cities.orderBy(x => x.Name).firstOrDefault());
            this.$scope.$watch("$.buildings", () => this.selectedBuilding = this.buildings.orderBy(x => x.Name).firstOrDefault());
            this.$scope.$watch("$.areas", () => {
                this.selectedArea = this.areas.orderBy(x => x.Name).firstOrDefault();
            });

            this.$scope.$watch("$.selectedCountry", () => this.LoadCities());
            this.$scope.$watch("$.selectedCity", () => this.LoadBuildings());
            this.$scope.$watch("$.selectedBuilding", () => this.LoadAreas());
            this.$scope.$watch("$.selectedArea", () => {
                this.LoadDoors();
            });
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
            this.LoadBuildings();
        }


        //#region - Country -

        LoadCountries() {
            this.countries = [];
            return this.$timeout(() => {
                return this.samCountries.Load().then(res => this.countries = res);
            });
        }
        AddCountry() { this.samCountries.EditModal(null, '_editCountry.html').then(res => this.countries.push(res)); }
        EditCountry(c: ICountry) { this.samCountries.EditModal(c, '_editCountry.html'); }
        DeleteCountry(c: ICountry) { this.samCountries.DeleteModal(c).then(() => this.countries.Remove(c)); }

        //#endregion 

        //#region - City -

        LoadCities() {
            this.cities = [];
            this.$timeout(() => {
                if (this.selectedCountry)
                    this.samCities.Load(Services.OData.create.eq("CountryId", this.selectedCountry.Id)).then(res => {
                        this.cities = res;
                    });
            });
        }
        AddCity() { this.samCities.EditModal(<ICity>{ CountryId: this.selectedCountry.Id }, '_editCity.html').then(res => this.cities.push(res)); }
        EditCity(c: ICity) { this.samCities.EditModal(c, '_editCity.html'); }
        DeleteCity(c: ICity) { this.samCities.DeleteModal(c).then(() => this.cities.Remove(c)); }

        //#endregion 

        //#region - Building -

        LoadBuildings() {
            this.buildings = [];
            if (!this.selectedCustomerId) return;
            this.$timeout(() => {
                if (this.selectedCity)
                    this.samBuildings.Load(
                            Services.OData.create
                            .eq("CityId", this.selectedCity.Id)
                            .eq("CustomerId", this.selectedCustomerId))
                        .then(res => {
                        this.buildings = res;
                    });
            });
        }
        AddBuilding() { this.samBuildings.EditModal(<IBuilding>{ CityId: this.selectedCity.Id }, '_editBuilding.html', this.$scope).then(res => this.buildings.push(res)); }
        EditBuilding(b: IBuilding) { this.samBuildings.EditModal(b, '_editBuilding.html', this.$scope); }
        DeleteBuilding(b: IBuilding) { this.samBuildings.DeleteModal(b).then(() => this.buildings.Remove(b)); }

        //#endregion 

        //#region - Area -

        LoadAreas() {
            this.areas = [];
            this.$timeout(() => {
                if (this.selectedBuilding)
                    this.samAreas.Load(Services.OData.create.eq("BuildingId", this.selectedBuilding.Id)).then(res => {
                        this.areas = res;
                    });
            });
        }
        AddArea() { this.samAreas.EditModal(<IArea>{ BuildingId: this.selectedBuilding.Id }, '_editArea.html', this.$scope).then(res => this.areas.push(res)); }
        EditArea(a: IArea) { this.samAreas.EditModal(a, '_editArea.html', this.$scope); }
        DeleteArea(a: IArea) { this.samAreas.DeleteModal(a).then(() => this.areas.Remove(a)); }

        //#endregion 

        //#region - Door -

        LoadDoors() {
            this.doors = [];
            this.$timeout(() => {
                if (this.selectedArea)
                    this.samDoors.Load(Services.OData.create.eq("AreaId", this.selectedArea.Id)).then(res => {
                        this.doors = res;
                    });
            });
        }
        AddDoor() {
            this.samDoors.EditModal(<IDoor>{ AreaId: this.selectedArea.Id }, '_editDoor.html', this.$scope).then(res => this.doors.push(res));
        }
        EditDoor(d: IDoor) {
            this.samDoors.EditModal(d, '_editDoor.html', this.$scope);
        }
        DeleteDoor(d: IDoor) { this.samDoors.DeleteModal(d).then(() => this.doors.Remove(d)); }

        //#endregion 
    }

    // register controller with angular
    app.controller('doors', Doors.Factory("samCustomers", "samCountries", "samCities", "samBuildings", "samAreas", "samDoors", "samEmployees"));
}
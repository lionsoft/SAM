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
        samUsers: Services.IUsersService;

        public selectedCountry: ICountry;
        public countries: ICountry[] = [];

        public selectedCity: ICity;
        public cities: ICity[] = [];

        public selectedBuilding: IBuilding;
        public buildings: IBuilding[] = [];

        public selectedArea: IArea;
        public areas: IArea[] = [];

        // for edit dialogs
        public owners: IUser[];


        //#endregion

        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(this.LoadCountries());
            this.samUsers.Load().then(res => this.owners = res);
        }

        Activated() {
            this.$scope.$watch("$.countries", () => this.selectedCountry = this.countries.orderBy(x => x.Name).firstOrDefault());
            this.$scope.$watch("$.cities", () => this.selectedCity = this.cities.orderBy(x => x.Name).firstOrDefault());
            this.$scope.$watch("$.buildings", () => this.selectedBuilding = this.buildings.orderBy(x => x.Name).firstOrDefault());

            this.$scope.$watch("$.selectedCountry", () => this.LoadCities());
            this.$scope.$watch("$.selectedCity", () => this.LoadBuildings());
            this.$scope.$watch("$.selectedBuilding", () => this.LoadAreas());
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
        AddCity() { this.samCities.EditModal(<any>{ CountryId: this.selectedCountry.Id }, '_editCity.html').then(res => this.cities.push(res)); }
        EditCity(c: ICity) { this.samCities.EditModal(c, '_editCity.html'); }
        DeleteCity(c: ICity) { this.samCities.DeleteModal(c).then(() => this.cities.Remove(c)); }

        //#endregion 

        //#region - Building -

        LoadBuildings() {
            this.buildings = [];
            this.$timeout(() => {
                if (this.selectedCity)
                    this.samBuildings.Load(Services.OData.create.eq("CityId", this.selectedCity.Id)).then(res => {
                        this.buildings = res;
                    });
            });
        }
        AddBuilding() { this.samBuildings.EditModal(<any>{ CityId: this.selectedCity.Id }, '_editBuilding.html', this.$scope).then(res => this.buildings.push(res)); }
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
        AddArea() { this.samAreas.EditModal(<any>{ BuildingId: this.selectedBuilding.Id }, '_editArea.html', this.$scope).then(res => this.areas.push(res)); }
        EditArea(a: IArea) { this.samAreas.EditModal(a, '_editArea.html', this.$scope); }
        DeleteArea(a: IArea) { this.samAreas.DeleteModal(a).then(() => this.areas.Remove(a)); }

        //#endregion 

    }

    // register controller with angular
    app.controller('doors', Doors.Factory("samCountries", "samCities", "samBuildings", "samAreas", "samUsers"));
}
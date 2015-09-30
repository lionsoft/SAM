'use strict';

module App.Controllers {

    class ApplyAccess extends PageController {

        samUsers: Services.IUsersService;
        samCountries: Services.ICountriesService;
        samCities: Services.ICitiesService;
        samBuildings: Services.IBuildingsService;
        samAreas: Services.IAreasService;
        samDoors: Services.IDoorsService;
        samCardAccess: Services.ICardAccessService;

        public countries: ICountry[] = [];
        public selectedCountryId: string;

        public cities: ICountry[] = [];
        public selectedCityId: string;

        public buildings: ICountry[] = [];
        public selectedBuildingId: string;

        public areas: ICountry[] = [];
        public selectedAreaId: string;

        public doors: ICountry[] = [];
        public selectedDoorIds: string[] = [];

        public note: string;

        public noActivatedCard: boolean;

        Init() {
            this.samUsers.Update(app.$auth.LoggedUser).then(() => {
                this.noActivatedCard = !app.$auth.LoggedUser.Employee.CardId;
            });
            this.$scope.$watch("$.selectedCountryId", (val: string) => this.LoadCities(val));
            this.$scope.$watch("$.selectedCityId", (val: string) => this.LoadBuildings(val));
            this.$scope.$watch("$.selectedBuildingId", (val: string) => this.LoadAreas(val));
            this.$scope.$watch("$.selectedAreaId", (val: string) => this.LoadDoors(val));
        }

        Activated() {
            this.samCountries.Load().then(res => this.countries = res.orderBy(x => x.Name).toArray());
        }


        LoadCities(countryId: string) {
            this.selectedCityId = null;
            this.cities = [];
            if (countryId)
                this.samCities.Load(Services.OData.create.eq("CountryId", countryId)).then(res => this.cities = res.orderBy(x => x.Name).toArray());
        }
        LoadBuildings(cityId: string) {
            this.selectedBuildingId = null;
            this.buildings = [];
            if (cityId)
                this.samBuildings.Load(Services.OData.create.eq("CityId", cityId)).then(res => this.buildings = res.orderBy(x => x.Name).toArray());
        }
        LoadAreas(buildingId: string) {
            this.selectedAreaId = null;
            this.areas = [];
            if (buildingId)
                this.samAreas.Load(Services.OData.create.eq("BuildingId", buildingId)).then(res => this.areas = res.orderBy(x => x.Name).toArray());
        }
        LoadDoors(areaId: string) {
            this.doors = [];
            if (areaId)
                this.samDoors.Load(Services.OData.create.eq("AreaId", areaId)).then(res => this.doors = res.orderBy(x => x.Name).toArray());
        }

        public Submit(form) {
            if (LionSoftAngular.ValidateForm(form) && this.selectedDoorIds.length > 0) {
                this.samCardAccess.RequestAccess(this.selectedDoorIds, this.note).then(() => success('OK'));
            } else {
                form.doors.$setTouched();
            }
        }
    }

    app.controller('applyAccess', ApplyAccess.Factory("samUsers", "samCountries", "samCities", "samBuildings", "samAreas", "samDoors", "samCardAccess"));

} 
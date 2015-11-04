'use strict';

module App.Controllers {

    class ApplyAccess extends PageController {

        samUsers: Services.IUsersService;
        samCountries: Services.ICountriesService;
        samCities: Services.ICitiesService;
        samDepartments: Services.IDepartmentsService;
        samBuildings: Services.IBuildingsService;
        samAreas: Services.IAreasService;
        samDoors: Services.IDoorsService;
        samCardAccess: Services.ICardAccessService;
        samEmployees: Services.IEmployeesService;
        samTimeZones: Services.ITimeZonesService;

        public countries: ICountry[] = [];
        public selectedCountryId: string;

        public cities: ICity[] = [];
        public selectedCityId: string;

        public buildings: IBuilding[] = [];
        public selectedBuildingId: string;

        public areas: IArea[] = [];
        public selectedAreaId: string;

        public doors: IDoor[] = [];
        public selectedDoorIds: string[] = [];

        public employees: IEmployee[] = [];
        public whoGetsAccessEmployeeId: string;

        public timeZones: ITimeZone[] = [];
        public selectedTimeZoneId: string;

        public note: string;

        public noActivatedCard: boolean;

        customerId: string;

        Init() {
            this.samUsers.Update(app.$auth.LoggedUser)
                .then(() => {
                    this.noActivatedCard = !app.$auth.LoggedUser.Employee.CardId;
                    this.updateEmployees();
                    return this.samDepartments.Load(app.$auth.LoggedUser.Employee.DepartmentId, "Company");
                })
                .then(dep => this.customerId = dep.Company.CustomerId);
            this.$scope.$watch("$.selectedCountryId", (val: string) => this.LoadCities(val));
            this.$scope.$watch("$.selectedCityId", (val: string) => this.LoadBuildings(val));
            this.$scope.$watch("$.selectedBuildingId", (val: string) => this.LoadAreas(val));
            this.$scope.$watch("$.selectedAreaId", (val: string) => this.LoadDoors(val));
        }

        private updateEmployees() {
            this.employees = [];
            this.timeZones = [];
            this.selectedTimeZoneId = undefined;
            var customerId = this.buildings.select(b => b.CustomerId).firstOrDefault();
            var query = customerId ? this.samEmployees.LoadByCustomer(customerId) : this.promiseFromResult([]);
            query
                .then(x => this.employees = x)
                .finally(() => {
                    if (app.$auth.LoggedUser && app.$auth.LoggedUser.Employee) {
                        if (this.employees.all(x => x.Id !== app.$auth.LoggedUser.Employee.Id))
                            this.employees.unshift(app.$auth.LoggedUser.Employee);
                        if (this.employees.all(x => x.Id !== this.whoGetsAccessEmployeeId))
                            this.whoGetsAccessEmployeeId = app.$auth.LoggedUser.Employee.Id;
                    }
                });

            this.samTimeZones.LoadByCustomer(customerId).then(x => this.timeZones = x);

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
                this.samBuildings.Load(Services.OData.create
                    .eq("CityId", cityId)
                    .eq("CustomerId", this.customerId)
                )
                    .then(res => this.buildings = res.orderBy(x => x.Name).toArray());
        }
        LoadAreas(buildingId: string) {
            this.updateEmployees();
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
                this.samCardAccess.RequestAccess(this.selectedTimeZoneId, this.selectedDoorIds, this.note, this.whoGetsAccessEmployeeId).then(() => success('OK'));
            } else {
                form.doors.$setTouched();
            }
        }
    }

    app.controller('applyAccess', ApplyAccess.Factory("samUsers", "samCountries", "samCities", "samBuildings", "samAreas", "samDoors", "samCardAccess", "samEmployees", "samTimeZones", "samDepartments"));

} 
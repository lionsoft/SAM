'use strict';

module App.Controllers {

    class Lists extends Controller {

        samCustomers: Services.ICustomersService;
        samDepartments: Services.IDepartmentsService;
//        samDoorLists: Services.IDoorListsService;
//        samDepartmentLists: Services.IDepartmentListsService;

        public selectedCustomerId: string;
        public customers: ICustomer[] = [];

        public selectedDepartmentId: string;
        public departments: IDepartment[] = [];


        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(
                this.samCustomers.Load().then(res => this.customers = res),
                this.samDepartments.Load().then(res => this.departments = res));
        }

        Activated() {
            this.$scope.$watch("$.customers", () => this.selectedCustomerId = this.customers.select(x => x.Id).firstOrDefault());
            this.$scope.$watch("$.departments", () => this.selectedDepartmentId = this.departments.select(x => x.Id).firstOrDefault());
        }

        prepareDoorListQuery(odata: Services.OData) {
            odata.eq("CustomerId", this.selectedCustomerId);
            return "selectedCustomerId";
        }

        prepareDepartmentListQuery(odata: Services.OData) {
            odata.eq("DepartmentId", this.selectedDepartmentId);
            return "selectedDepartmentId";
        }
    }

    // Register with angular
    app.controller('lists', Lists.Factory("samCustomers", "samDepartments"));
}
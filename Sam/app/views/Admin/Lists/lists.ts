'use strict';

module App.Controllers {

    class Lists extends PageController {

        samCustomers: Services.ICustomersService;
        samDepartments: Services.IDepartmentsService;

        public selectedCustomerId: string;
        public customers: ICustomer[] = [];

        public selectedDepartmentId: string;
        public departments: IDepartment[] = [];


        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(
                this.samCustomers.Load().then(res => this.customers = res)
            );
        }

        Activated() {
            this.$scope.$watch("$.selectedCustomerId", () => this.samDepartments.LoadByCustomer(this.selectedCustomerId).then(res => this.departments = res));
            this.$scope.$watch("$.departments", () => {
                this.selectedDepartmentId = undefined;
            });
        }

        prepareDoorListQuery(odata: Services.OData) {
            odata.eq("CustomerId", this.selectedCustomerId);
            return "selectedCustomerId";
        }

        prepareDepartmentListQuery(odata: Services.OData) {
            odata.eq("DepartmentId", this.selectedDepartmentId).$expand("ApprovedBy");
            return "selectedDepartmentId";
        }
    }

    // Register with angular
    app.controller('lists', Lists.Factory("samCustomers", "samDepartments"));
}
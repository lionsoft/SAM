'use strict';

module App.Controllers {

    class Lists extends Controller {

        samCustomers: Services.ICustomersService;
//        samDoorLists: Services.IDoorListsService;
//        samDepartmentLists: Services.IDepartmentListsService;

        public selectedCustomerId: string;
        public customers: ICustomer[] = [];


        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(this.LoadCustomers());
        }

        LoadCustomers() {
            return this.samCustomers.Load().then(res => this.customers = res);
        }

        Activated() {
            this.$scope.$watch("$.customers", () => this.selectedCustomerId = this.customers.select(x => x.Id).firstOrDefault());
        }

        prepareDoorsQuery(odata: Services.OData) {
/*
            odata.eq("CustomerId", this.selectedCustomerId);
            return "selectedCustomerId";
*/
        }

        prepareDoorListQuery(odata: Services.OData) {
            odata.eq("CustomerId", this.selectedCustomerId);
            return "selectedCustomerId";
        }

        prepareDoorListEdit(doorList: IDoorList) {
            alert('1');
/*
            if (!doorList.Id) {
                doorList.CustomerId = this.selectedCustomerId;
            }
*/
        }

        //AddDoorToList()
    }

    // Register with angular
    app.controller('lists', Lists.Factory("samCustomers", "samDoorLists", "samDepartmentLists"));
}
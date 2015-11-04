'use strict';

module App.Controllers {

    class Users extends PageController {

        samCustomers: Services.ICustomersService;

        public selectedCustomerId: string;

        public customers: ICustomer[] = [];


        Init() {
            this.samCustomers.Load().then(res => this.customers = res);
        }                                                             

        Activated() {
        }

        prepareQuery(odata: Services.OData) {
            odata.eq("Employee.Department.Company.CustomerId", this.selectedCustomerId);
            return "selectedCustomerId";
        }

    }

    // Register with angular
    app.controller('users', Users.Factory("samCustomers"));
}
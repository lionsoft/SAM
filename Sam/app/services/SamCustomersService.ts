'use strict';

module App.Services {

    export interface ICustomersService extends ICRUDService<ICustomer> {
    }

    class CustomersService extends CRUDService<ICustomer> implements ICustomersService {
        TypeDescription = "Customer";
        get ApiService() { return app.api.Customers; }
    }

    app.service("samCustomers", CustomersService.Factory());
} 
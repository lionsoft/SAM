'use strict';

module App.Services {

    export interface ICustomersService extends ICRUDService<ICustomer> {
    }

    class CustomersService extends CRUDService<ICustomer> implements ICustomersService {

        samCompanies: ICompaniesService;

    }

    app.service("samCustomers", CustomersService.Factory("samCompanies"));
} 
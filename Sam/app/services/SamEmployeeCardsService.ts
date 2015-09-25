'use strict';

module App.Services {

    export interface IEmployeeCardsService extends ICRUDService<IEmployeeCard> {
    }

    class EmployeeCardsService extends CRUDService<IEmployeeCard> implements IEmployeeCardsService {
        get ApiService() { return app.api.EmployeeCards; }
    }

    app.service("samEmployeeCards", EmployeeCardsService.Factory());
} 
'use strict';

module App.Services {

    export interface ICompaniesService extends ICRUDService<ICompany> {
    }

    class CompaniesService extends CRUDService<ICompany> implements ICompaniesService {
        TypeDescription = "Company";
        get ApiService() { return app.api.Companies; }
    }

    app.service("samCompanies", CompaniesService.Factory());
} 
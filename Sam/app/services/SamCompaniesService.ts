'use strict';

module App.Services {

    export interface ICompaniesService extends ICRUDService<ICompany> {
    }

    class CompaniesService extends CRUDService<ICompany> implements ICompaniesService {
        samDepartments: IDepartmentsService;
    }

    app.service("samCompanies", CompaniesService.Factory("samDepartments"));
} 
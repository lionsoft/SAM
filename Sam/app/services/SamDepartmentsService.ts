'use strict';

module App.Services {

    export interface IDepartmentsService extends ICRUDService<IDepartment> {
    }

    class DepartmentsService extends CRUDService<IDepartment> implements IDepartmentsService {
        TypeDescription = "Department";
        get ApiService() { return app.api.Departments; }
    }

    app.service("samDepartments", DepartmentsService.Factory());
} 
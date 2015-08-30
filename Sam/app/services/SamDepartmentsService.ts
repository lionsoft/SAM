'use strict';

module App.Services {

    export interface IDepartmentsService extends ICRUDService<IDepartment> {
    }

    class DepartmentsService extends CRUDService<IDepartment> implements IDepartmentsService {
    }

    app.service("samDepartments", DepartmentsService.Factory());
} 
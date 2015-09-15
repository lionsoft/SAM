'use strict';

module App.Services {

    export interface IDepartmentListsService extends ICRUDService<IDepartmentList> {
    }

    class DepartmentListsService extends CRUDService<IDepartmentList> implements IDepartmentListsService {
        TypeDescription = "DepartmentList";
        get ApiService() { return app.api.DepartmentLists; }
    }

    app.service("samDepartmentLists", DepartmentListsService.Factory());
}  
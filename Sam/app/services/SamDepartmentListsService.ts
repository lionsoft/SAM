'use strict';

module App.Services {

    export interface IDepartmentListsService extends ICRUDService<IDepartmentList> {
    }

    class DepartmentListsService extends CRUDService<IDepartmentList> implements IDepartmentListsService {

        samDoorLists: IDoorListsService;

        TypeDescription = "DepartmentList";
        get ApiService() { return app.api.DepartmentLists; }

        prepareSave(entity: IDepartmentList): void {
            var doorLists = entity.DoorLists;
            super.prepareSave(entity);
            doorLists.forEach(d => this.samDoorLists.prepareSave(d));
            entity.DoorLists = doorLists;
        }

    }

    app.service("samDepartmentLists", DepartmentListsService.Factory("samDoorLists"));
}  
'use strict';

module App.Services {

    export interface IDoorListsService extends ICRUDService<IDoorList> {
    }

    class DoorListsService extends CRUDService<IDoorList> implements IDoorListsService {
        TypeDescription = "DoorList";
        get ApiService() { return app.api.DoorLists; }
    }

    app.service("samDoorLists", DoorListsService.Factory());
}  
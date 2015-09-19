'use strict';

module App.Services {

    export interface IDoorListsService extends ICRUDService<IDoorList> {
    }

    class DoorListsService extends CRUDService<IDoorList> implements IDoorListsService {
        TypeDescription = "DoorList";
        get ApiService() { return app.api.DoorLists; }

        samDoors: IDoorsService;

        prepareSave(entity: IDoorList): void {
            var doors = entity.Doors;
            super.prepareSave(entity);
            if (doors) {
                doors.forEach(d => this.samDoors.prepareSave(d));
                entity.Doors = doors;
            }
        }
    }

    app.service("samDoorLists", DoorListsService.Factory("samDoors"));
}  
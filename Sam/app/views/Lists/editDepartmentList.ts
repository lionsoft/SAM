'use strict';

module App.Controllers {

    class EditDepartmentList extends Controller {

        $;
        $item: IDoorList;

        samDoorLists: Services.IDoorListsService;

        public selectedCustomerId: string;


        Init() {
        }

        prepareEdit(doorList: IDoorList) {
            if (!doorList.Id) {
                doorList.CustomerId = this.$.selectedCustomerId;
            } else {
                return this.samDoorLists.Load(doorList.Id, "Doors").then(res => {
                    doorList.Doors = res.Doors;
                });
            }
        }

        IsDoorInList(door: IDoor) {
            this.$item.Doors = this.$item.Doors || [];
            return this.$item.Doors.any(d => d.Id === door.Id);
        }

        AddDoorToList(door: IDoor) {
            if (!this.IsDoorInList(door))
                this.$item.Doors.push(door);
        }

        RemoveDoorFromList(door: IDoor) {
            if (this.IsDoorInList(door))
                this.$item.Doors.Remove(door);
        }
    }

    // Register with angular
    app.controller('editDepartmentList', EditDepartmentList.Factory("samDoorLists"));
} 
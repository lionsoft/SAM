'use strict';

module App.Controllers {

    class EditDepartmentList extends Controller {

        $;
        $item: IDepartmentList;

        samDepartmentLists: Services.IDepartmentListsService;

        public selectedCustomerId: string;


        Init() {
        }

        prepareEdit(departmentList: IDepartmentList) {
            if (!departmentList.Id) {
                departmentList.DepartmentId = this.$.selectedDepartmentId;
            } else {
                return this.samDepartmentLists.Load(departmentList.Id, "DoorLists").then(res => {
                    departmentList.DoorLists = res.DoorLists;
                });
            }
        }

        IsDoorListInList(doorList: IDoorList) {
            this.$item.DoorLists = this.$item.DoorLists || [];
            return this.$item.DoorLists.any(d => d.Id === doorList.Id);
        }

        AddDoorListToList(doorList: IDoorList) {
            if (!this.IsDoorListInList(doorList))
                this.$item.DoorLists.push(doorList);
        }

        RemoveDoorListFromList(doorList: IDoorList) {
            if (this.IsDoorListInList(doorList))
                this.$item.DoorLists.Remove(doorList);
        }
    }

    // Register with angular
    app.controller('editDepartmentList', EditDepartmentList.Factory("samDepartmentLists"));
} 
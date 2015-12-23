'use strict';

module App.Controllers {

    class EditDepartmentList extends Controller {

        $;
        $item: IDepartmentList;

        samDepartmentLists: Services.IDepartmentListsService;
        samDepartments: Services.IDepartmentsService;

        selectedCustomerId: string;


        Init() {
            this.$scope.$watch("$item.DepartmentId", (depId: string) => {
                this.selectedCustomerId = undefined;
                if (depId)
                    this.samDepartments.Load(depId, "Company").then(res => {
                        if (res.Company)
                            this.selectedCustomerId = res.Company.CustomerId;
                    });
            });
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

        prepareDoorListsQuery(odata: Services.OData) {
            if (!this.selectedCustomerId)
                odata.$empty = true;
            else
                odata.eq("CustomerId", this.selectedCustomerId);
            return "selectedCustomerId";
        }
        
    }

    // Register with angular
    app.controller('editDepartmentList', EditDepartmentList.Factory("samDepartmentLists", "samDepartments"));
} 
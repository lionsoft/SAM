﻿'use strict';

module App.Controllers {

    class EditDoorList extends Controller {

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

        prepareDoorsQuery(odata: Services.OData) {
            odata.eq("PreApproved", true).eq("Area.Building.CustomerId", this.$item.CustomerId);
            return "$item.CustomerId";
        }
    }

    // Register with angular
    app.controller('editDoorList', EditDoorList.Factory("samDoorLists"));
} 
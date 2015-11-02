'use strict';

module App.Controllers {

    class TimeZones extends PageController {

        Init() {
        }

        Activated() {
        }

        prepareQuery(odata: Services.OData) {
        }

        prepareEdit(item: ITimeZone) {
        }
    }

    // Register with angular
    app.controller('timeZones', TimeZones.Factory());
}
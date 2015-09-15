'use strict';

module App.Services {

    export interface IDoorsService extends ICRUDService<IDoor> {
    }

    class DoorsService extends CRUDService<IDoor> implements IDoorsService {
        TypeDescription = "Door";
        get ApiService() { return app.api.Doors; }

        protected prepareQuery(odata: OData, isSmartLoad?: boolean): void {
            super.prepareQuery(odata, isSmartLoad);
            odata.$expand("Owner");
        }

    }

    app.service("samDoors", DoorsService.Factory());
} 
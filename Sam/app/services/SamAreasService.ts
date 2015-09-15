'use strict';

module App.Services {

    export interface IAreasService extends ICRUDService<IArea> {
    }

    class AreasService extends CRUDService<IArea> implements IAreasService {
        TypeDescription = "Area";
        get ApiService() { return app.api.Areas; }

        protected prepareQuery(odata: OData, isSmartLoad?: boolean): void {
            super.prepareQuery(odata, isSmartLoad);
            odata.$expand("Owner");
        }

    }

    app.service("samAreas", AreasService.Factory());
} 
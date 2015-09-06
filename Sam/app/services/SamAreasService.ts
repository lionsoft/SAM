'use strict';

module App.Services {

    export interface IAreasService extends ICRUDService<IArea> {
    }

    class AreasService extends CRUDService<IArea> implements IAreasService {
        TypeDescription = "Area";
        get ApiService() { return app.api.Areas; }

        protected prepareQuery(odata: OData): void {
            super.prepareQuery(odata);
            odata.$expand("Owner");
        }

    }

    app.service("samAreas", AreasService.Factory());
} 
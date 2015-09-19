'use strict';

module App.Services {

    export interface IBuildingsService extends ICRUDService<IBuilding> {
    }

    class BuildingsService extends CRUDService<IBuilding> implements IBuildingsService {
        TypeDescription = "Building";
        get ApiService() { return app.api.Buildings; }

        protected prepareQuery(odata: OData, isSmartLoad?: boolean): void {
            super.prepareQuery(odata, isSmartLoad);
            odata.$expand("Owner");
        }

    }

    app.service("samBuildings", BuildingsService.Factory());
} 
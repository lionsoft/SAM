'use strict';

module App.Services {

    export interface ITimeZonesService extends ICRUDService<ITimeZone> {
    }

    class TimeZonesService extends CRUDService<ITimeZone> implements ITimeZonesService {
        TypeDescription = "TimeZone";
        GetDescription(user: ITimeZone): string { return user.Name; }
        
        get ApiService() { return app.api.TimeZones; }

        public prepareSave(tz: ITimeZone): void {
            // skip default behavior
            tz.CreatedBy = undefined;
            tz.ModifiedDate = undefined;
            tz.ModifiedBy = undefined;
        }

        protected prepareQuery(odata: OData, isSmartLoad?: boolean): void {
            super.prepareQuery(odata, isSmartLoad);
        }
    }

    app.service("samTimeZones", TimeZonesService.Factory());
} 
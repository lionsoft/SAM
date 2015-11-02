'use strict';

module App.Services {

    export interface ITimeZonesService extends ICRUDService<ITimeZone> {
        /**
         * Load time zones for the specified customer only
         * @param customerId customer Id
         */
        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<ITimeZone[]>;
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

        /**
         * Load time zones for the specified customer only
         * @param customerId customer Id
         */
        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<ITimeZone[]> {
            return super.Load(Services.OData.create.eq("CustomerId", customerId).$expand(...expands));
        }
    }

    app.service("samTimeZones", TimeZonesService.Factory());
} 
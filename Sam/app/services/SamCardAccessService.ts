'use strict';

module App.Services {

    export interface ICardAccessService extends ICRUDService<ICardAccess> {
        /**
         * Load employees for the specified customer only
         * @param customerId customer Id
         */
        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<ICardAccess[]>;
    }

    class CardAccessService extends CRUDService<ICardAccess> implements ICardAccessService {
        TypeDescription = "Assignment";
        get ApiService() { return app.api.CardAccess; }

        GetDescription(cardAccess: ICardAccess): string {
            return `${this.$filter('CardNumber')(cardAccess.Card.Number)} - ${cardAccess.Door.Name}`;
        }

        protected prepareQuery(odata: OData, isSmartLoad?: boolean): void {
            odata.$expand("CreatedBy");
        }



        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<ICardAccess[]> {
            return super.Load(OData.create.$expand(...expands).eq("CustomerId", customerId));
        }
    }



    app.service("samCardAccess", CardAccessService.Factory());
} 
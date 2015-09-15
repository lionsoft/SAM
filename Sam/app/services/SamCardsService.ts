'use strict';

module App.Services {

    export interface ICardsService extends ICRUDService<ICard> {
        /**
         * Load employees for the specified customer only
         * @param customerId customer Id
         */
        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<ICard[]>;
    }

    class CardsService extends CRUDService<ICard> implements ICardsService {
        TypeDescription = "Card";
        get ApiService() { return app.api.Cards; }

        GetDescription(card: ICard): string {
            return card.Number ? card.Number.toString() : "";
        }

        protected prepareQuery(odata: OData, isSmartLoad?: boolean): void {
            odata.$expand("CreatedBy");
            if (!isSmartLoad)
                odata.$orderBy("Number");
        }



        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<ICard[]> {
            return super.Load(OData.create.$expand(...expands).eq("CustomerId", customerId));
        }
    }



    app.service("samCards", CardsService.Factory());
} 
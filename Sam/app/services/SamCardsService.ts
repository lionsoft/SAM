'use strict';

module App.Services {

    export interface ICardsService extends ICRUDService<ICard> {
        /**
         * Load employees for the specified customer only
         */
        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<ICard[]>;

        /**
         * Activate an employee card.
         */
        Activate(cardId: string, employeeId: string): IPromise<void>;
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

        Activate(cardId: string, employeeId: string): IPromise<void> {
            return this.ApiService.Activate(cardId, employeeId).HandleError();
        }

    }



    app.service("samCards", CardsService.Factory());
} 
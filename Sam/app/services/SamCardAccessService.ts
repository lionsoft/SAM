'use strict';

module App.Services {

    export interface ICardAccessService extends ICRUDService<ICardAccess> {
        RequestAccess(doorIds: string[], note: string, employeeId?: string): IPromise<void>;
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

        RequestAccess(doorIds: string[], note: string, employeeId?: string): IPromise<void> {
            return this.ApiService.RequestAccess(doorIds, note, employeeId).HandleError();
        }
    }



    app.service("samCardAccess", CardAccessService.Factory());
} 
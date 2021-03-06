﻿'use strict';

module App.Controllers {

    class Cards extends PageController {

        samCustomers: Services.ICustomersService;
        samCards: Services.ICardsService;

        public selectedCardStatus: CardStatus;
        public selectedCustomerId: string;
        public customers: ICustomer[] = [];


        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(this.LoadCustomers());
        }

        LoadCustomers() {
            return this.samCustomers.Load().then(res => this.customers = res.orderBy(x => x.Name).toArray());
        }

        Activated() {
        }

        prepareQuery(odata: Services.OData) {
            odata
                .eq("CustomerId", this.selectedCustomerId)
                .eq("Status", this.selectedCardStatus, true);  
            return "selectedCustomerId,selectedCardStatus";
        }

        prepareEdit(card: ICard) {
            if (!card.Id) {
                card.Status = CardStatus.Inactive;
                card.ActivationCode = LionSoftJs.CreateGUID();
                card.CardType = CardType.Internal;
                card.CustomerId = this.selectedCustomerId;
            }
        }

        RegenerateActivationCode($item: ICard) {
            $item.ActivationCode = LionSoftJs.CreateGUID();
        }
    }

    // Register with angular
    app.controller('cards', Cards.Factory("samCustomers", "samCards"));
}
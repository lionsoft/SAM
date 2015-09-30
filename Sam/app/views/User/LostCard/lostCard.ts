'use strict';

module App.Controllers {

    class LostCard extends PageController {

        samCards: Services.ICardsService;

        public explanation: string;

        Init() {
        }


        public Submit(form) {
            if (LionSoftAngular.ValidateForm(form)) {
                this.samCards.LostCardRequest(this.explanation).then(() => alert('Your card has been locked.'));
            }
        }
    }

    app.controller('lostCard', LostCard.Factory("samCards"));

} 
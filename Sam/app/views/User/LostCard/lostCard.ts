'use strict';

module App.Controllers {

    class LostCard extends PageController {

        samCards: Services.ICardsService;

        public explanation: string;

        Init() {
        }


        public Submit(form) {
            if (LionSoftAngular.ValidateForm(form)) {
                this.samCards.LostCardRequest(this.explanation).then(() => alert('CardIsLocked'));
            }
        }
    }

    app.controller('lostCard', LostCard.Factory("samCards"));

} 
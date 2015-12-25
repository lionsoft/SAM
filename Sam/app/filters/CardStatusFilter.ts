'use strict';
module App.Filters {

    class CardStatusFilter extends EnumFilter
    {
        Source =
        [
            { Key: CardStatus.Active, Value: 'cardStatus.Active' },
            { Key: CardStatus.Inactive, Value: 'cardStatus.Inactive' },
            { Key: CardStatus.Lost, Value: 'cardStatus.Lost' },
        ];
    }

    app.filter("CardStatus", CardStatusFilter.Factory());
}
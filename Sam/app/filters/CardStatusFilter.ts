'use strict';
module App.Filters {

    class CardStatusFilter extends EnumFilter
    {
        Source =
        [
            { Key: CardStatus.Active, Value: 'Active' },
            { Key: CardStatus.Inactive, Value: 'Inactive' },
            { Key: CardStatus.Lost, Value: 'Lost' },
        ];
    }

    app.filter("CardStatus", CardStatusFilter.Factory());
}
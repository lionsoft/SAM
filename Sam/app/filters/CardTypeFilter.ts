'use strict';
module App.Filters {

    class CardTypeFilter extends EnumFilter
    {
        Source =
        [
            { Key: CardType.Internal, Value: 'Internal' },
            { Key: CardType.Guest, Value: 'Guest' },
        ];
    }

    app.filter("CardType", CardTypeFilter.Factory());
}
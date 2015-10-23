'use strict';
module App.Filters {

    class CardTypeFilter extends EnumFilter
    {
        Source =
        [
            { Key: CardType.Internal, Value: 'Internal' },
            { Key: CardType.Guest, Value: 'Guest' },
            { Key: CardType.External, Value: 'External' },
            { Key: CardType.Replacement, Value: 'Replacement' },
        ];
    }

    app.filter("CardType", CardTypeFilter.Factory());
}
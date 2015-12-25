'use strict';
module App.Filters {

    class CardTypeFilter extends EnumFilter
    {
        Source =
        [
            { Key: CardType.Internal, Value: 'cardType.Internal' },
            { Key: CardType.Guest, Value: 'cardType.Guest' },
            { Key: CardType.External, Value: 'cardType.External' },
            { Key: CardType.Replacement, Value: 'cardType.Replacement' },
        ];
    }

    app.filter("CardType", CardTypeFilter.Factory());
}
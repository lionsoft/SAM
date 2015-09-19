'use strict';
module App.Filters {

    class CardNumberFilter extends Filter
    {
        Execute(value: number): string {
            var str = "" + value;
            var pad = "00000000";
            return pad.substring(0, pad.length - str.length) + str;
        }
    }

    app.filter("CardNumber", CardNumberFilter.Factory());
}
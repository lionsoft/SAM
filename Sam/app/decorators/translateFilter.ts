﻿'use strict';

module App.Decorators {

    // ReSharper disable once InconsistentNaming
    /**
     *  Configure Translate filter decorator
     */
    class TranslateFilterDecorator extends LionSoftAngular.Filter {

        $delegate: angular.translate.ITranslateService;
        $translate: angular.translate.ITranslateService;

        $route: angular.route.IRouteService;

        Execute(translationId: string, params?: any): string {
            var defValue = this.$translate['__makeNonLocalizedDefValue'](translationId);
            var currentView = "";
            if (translationId) {
                if (this.$route.current) currentView = this.$route.current.name;
                var arr = translationId.split('|', 2);
                if (arr.length === 2) {
                    translationId = arr[0].trim();
                    defValue = (arr[1] || "").trim();
                }
            }
            var res;
            if (currentView) {
                res = this.$delegate(currentView + "." + translationId, params);
                if (res !== currentView + "." + translationId)
                    return this.$translate['__formatLocalizedValue'](res);
            }
            res = this.$delegate(translationId, params);

            if (res === translationId)
                res = defValue;
            else
                res = this.$translate['__formatLocalizedValue'](res);
            return res;
        }
    }

    app.decorator("translateFilter", TranslateFilterDecorator.Factory("$delegate", "$route", "$translate"));

} 
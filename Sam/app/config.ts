'use strict';
module App {

    export interface IEvents {
        controllerActivateSuccess: string;
        spinnerToggle: string;
    }

    export interface IConfigurations {
        appErrorPrefix: string;  //Configure the exceptionHandler decorator
        docTitle: string;
        events: IEvents;
        version: string,
        imageSettings: { imageBasePath: string, unknownPersonImageSource: string }
    }

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    var events: IEvents = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config: IConfigurations = {
        appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator
        docTitle: 'HotTowel: ',
        events: events,
        version: '2.1.0',
        imageSettings: { imageBasePath: '', unknownPersonImageSource: '' }
    };

    app.value('config', config);

    app.config(['$logProvider', $logProvider => {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);
    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', (cfg: Shared.ICommonConfig) => {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);
    //#endregion

    //#region Configure CORS for $http provider
    app.config(['$httpProvider', $httpProvider => {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // Должен остаться признак, что это AJAX-запрос 
        $httpProvider.defaults.headers.common['X-Ajax-Request'] = "1";
    }]);
    //#endregion
/*
    LionSoftAngular.Services.app = app;

    //#region - Настройка общедоступных сервисов API -
    app.run(['ApiService', 'popupService', '$rootScope', (api, popup, $rootScope) => {
        app.api = api;
        app.popup = popup;
        $rootScope.App = App;
    }]);    
    //#endregion
*/

    //#region Configure $q to return App.IPromise with HandleError and ExtractError methods
    app.decorator("$q", ['$delegate', 
        $delegate => {
            var savedDefer = $delegate.defer;
            $delegate.defer = () => {
                var res = savedDefer();
                res.promise.HandleError = () => {
                    res.promise.catch(reason => {
                        console.error(reason);
                        ApiServiceBase.HandleError(reason);
                    });
                    return res.promise;
                };
                res.promise.ExtractError = () => {
                    var newRes1 = $delegate.defer();
                    res.promise
                        .then(r => newRes1.resolve(r))
                        .catch(reason => newRes1.reject(ApiServiceBase.ExctractError(reason)));
                    return newRes1.promise;
                };
                return res;
}
            return $delegate;
        }
    ]);

    //#endregion

    // Store controller name to its $scope
    app.decorator("$controller", ['$delegate',
        $delegate => {
            return (expression, locals, later, ident) => {
                if (typeof expression == "string") {
                    var arr = expression.split(" as ", 2);
                    if (arr.length == 1) {
                        locals.$scope.$controllerName = expression.trim();
                        locals.$scope.$controllerAs = "";
                    }
                    else {
                        locals.$scope.$controllerName = arr[0].trim();
                        locals.$scope.$controllerAs = arr[1].trim();
                    }
                }
                return $delegate(expression, locals, later, ident);
            }
        }
    ]);

    app.run(['$injector', (i) => {
        $.extend($.fn.dataTable.defaults, {
            info: false,
            searching: true,
            ordering: true,
            paging: false,
            processing: false,
            scrollCollapse: false,
            scrollY: 160,
            //scrollX: false,
        });
    }]);

}


 
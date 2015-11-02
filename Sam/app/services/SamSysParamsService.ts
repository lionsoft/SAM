'use strict';

module App.Services {

    export interface ISysParamsService extends ICRUDService<ISystemParameter> {
        Get(param: Parameter): IPromise<string>;
        Set(param: Parameter, value: string): IPromise<string>;
    }

    class SysParamsService extends CRUDService<ISystemParameter> implements ISysParamsService {
        get ApiService() { return app.api.SystemParameters; }

        Get(param: Parameter): IPromise<string> {
            return this.Load(<any>param).then(r => r.Value);
        }

        Set(param: Parameter, value: string): IPromise<string> {
            return this.Save({ Id: param, Value: value }).then(r => r.Value);
        }
    }

    app.service("samSysParams", SysParamsService.Factory());
} 
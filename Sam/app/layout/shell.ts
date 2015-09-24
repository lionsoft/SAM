/// <reference path="../common/common.ts" />
'use strict';

module App.Controllers
{
    export interface IShell
    {
        busyMessage: string;
        isBusy: boolean;
        spinnerOperations: {
            radius: number;
            lines: number;
            length: number;
            width: number;
            speed: number;
            corners: number;
            trail: number;
            color: string;
        }
        toggleSpinner(on: boolean): void;
    }

    export class Shell implements IShell
    {
        public static controllerId = 'shell';
        
        //#region Variables
        busyMessage = 'Please wait...';
        controllerId = Shell.controllerId;
        isBusy= true;
        spinnerOperations = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        }
        //#endregion

        constructor(public $rootScope: any, public common: App.Shared.ICommon, public config: any, public $scope: ng.IScope, public $route, public $routes: IAppRoute[])
        {
            this.activate();
            this.registerEvents();
        }

        public toggleSpinner(on: boolean): void {
            this.isBusy = on;
        }

        private activate()
        {
            var logger = this.common.logger.getLogFn(this.controllerId, 'success');
            //logger('Hot Towel Angular loaded!', null, true);
            this.common.activateController([], this.controllerId);
            this.$scope.$watch("vm.IsSidebarVisible", x => this.updateNavRoutes());
        }

        private registerEvents()
        {
            var events = this.config.events;
            this.$rootScope.$on('$routeChangeStart',
                (event, next, current) => { this.toggleSpinner(true); }
            );

            this.$rootScope.$on(events.controllerActivateSuccess,
                data => { this.toggleSpinner(false); }
            );

            this.$rootScope.$on(events.spinnerToggle,
                data => { this.toggleSpinner(data.show); }
            );
        }




        public IsSidebarVisible: boolean;
        public navRoutes: IAppRoute[];
        public selectedMenuItem: string;

        public isCurrent(route: IAppRoute | string) {
            this.IsSidebarVisible = this.$route.current.name !== "login";
            var res = "";
            if (this.$route.current && this.$route.current.name) {
                if (typeof route === "string") {
                    if (this.$route.current.settings && this.$route.current.settings.topMenu === route) {
                        res = 'current';
                        this.selectedMenuItem = this.$route.current.settings.topMenu
                    }
                } else if (route && route.name) {
                    var menuName = route.name;
                    res = (this.$route.current.name === menuName || this.$route.current.name.substr(0, menuName.length + 1) === `${menuName}.`) ? 'current' : '';
                }
            }
            return res;
        }

        private updateNavRoutes() {
            this.navRoutes = Enumerable.from(this.$routes).where(r => r.settings && r.settings.nav > 0 && RouteConfigurator.IsRouteGranted(r)).orderBy(r => r.settings.nav).toArray();
        }

        public selectMenuItem(menuItem) {
            this.selectedMenuItem = menuItem;
        }

        public GetNavMenuItems(): string[] {
            var res = this.navRoutes.where(x => !!x.settings.topMenu).select(x => x.settings.topMenu).distinct().orderBy(x => x).toArray();
            this.selectedMenuItem = this.selectedMenuItem || res[0];
            return res;
        }
    }

    // Register with angular
    app.controller(Shell.controllerId,
        ['$rootScope', 'common', 'config', '$scope', '$route', 'routes',
            ($rS, com, con, $scope, $route, routes) => new Shell($rS, com, con, $scope, $route, routes)]);
}
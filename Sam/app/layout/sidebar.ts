'use strict';

module App.Controllers {

    export interface ISidebarCtrl {
        isCurrent(route): string;
        navRoutes: IAppRoute[];
    }

    export class SidebarCtrl implements ISidebarCtrl {

        public navRoutes: IAppRoute[];

        //using shortcut syntax on private variables in the constructor
        constructor(private $route, private $config, private $routes: IAppRoute[], private $scope: ng.IScope) {
            this.activate();
        }

        public isCurrent(route: IAppRoute | string) {
            this.IsSidebarVisible = this.$route.current.name !== "login";
            var res = "";
            if (typeof route === "string") {
        
            } else {
                if (!route || !route.name || !this.$route.current || !this.$route.current.name) {
                    return '';
                }
                var menuName = route.name;
                res = (this.$route.current.name === menuName || this.$route.current.name.substr(0, menuName.length + 1) === `${menuName}.`) ? 'current' : '';
            }
            return res;
        }

        public navClick() {

        }

        private activate() {
            this.$scope.$watch("vm.IsSidebarVisible", x => this.updateNavRoutes());
                
        }

        private updateNavRoutes() {
            this.navRoutes = Enumerable.from(this.$routes).where(r => r.settings && r.settings.nav > 0 && RouteConfigurator.IsRouteGranted(r)).orderBy(r => r.settings.nav).toArray();
        }

        public GetNavMenuItems(): string[] {
            return this.navRoutes.where(x => !!x.settings.topMenu).select(x => x.settings.topMenu).distinct().orderBy(x => x).toArray();
        }

        public IsSidebarVisible: boolean;
    }

    // Register with angular
    app.controller('sidebarCtrl', ['$route', 'config', 'routes', '$scope', ($r, c, r, $scope) => new SidebarCtrl($r, c, r, $scope)]);
}
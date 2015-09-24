'use strict';
module App {
    export class RouteConfigurator {

        static IsRouteGranted(route: IAppRoute) {
            return route && !route.isInvisible && (!route.auth || !angular.isArray(route.roles) || (app.$auth && app.$auth.LoggedUser && app.$auth.LoggedUser.Employee && route.roles.contains(app.$auth.LoggedUser.Employee.UserRole)));
        };


        constructor($routeProvider: ng.route.IRouteProvider, routes: IAppRoute[]) {
//            var user: IUser = app['__loggedUser'];
            routes.forEach(r => {
/*
                if (r.roles !== undefined) {
                    if (!user || r.roles.indexOf(user.Employee.UserRole) === -1) {
                        r.isInvisible = true;
                        r = null;
                    }
                }
*/
                if (r) {
                    var template = "";
                    if (!r.templateUrl)
                        r.templateUrl = r.name;

                    if (typeof r.templateUrl === "string") {
                        template = <string>r.templateUrl;
                        if (!template.Contains("/") && !template.EndsWith(".html")) {
                            template = "/app/views/{0}/{0}.html".format(template);
                            r.templateUrl = template;
                        }
                    } else if (typeof r.templateUrl === "function") {
                        template = (<any>(r.templateUrl))();
                    }

                    if (template) {
                        var path = template.ExtractDirectory();
                        var name = template.ExtractOnlyFileName();
                        var scriptFileName = path + '/' + name + '.js';
                        var styleFileName = path + '/' + name + '.css';
                        if (!r.files) r.files = [];
                        r.files = r.files.selectMany(f => f.split(',')).select(f => {
                            if (!f.StartsWith('/'))
                                f = path + '/' + f;
                            if (!f.EndsWith('.js'))
                                f = f + '.js';
                            return f;
                        }).toArray();
                        if (!r.files.Contains(scriptFileName))
                            r.files.push(scriptFileName);
                        if (!r.files.Contains(styleFileName))
                            r.files.push(styleFileName);

                        if (r.files && r.files.length > 0) {
                            r.resolve = r.resolve || {};
                            r.resolve['lazy'] = [
                                '$ocLazyLoad', '$q', ($ocLazyLoad, $q: ng.IQService) => {
                                    if (r.files && r.files.length > 0)
                                        return $ocLazyLoad.load([{ name: App.app.name, files: r.files, serie: true }]);
                                }
                            ];
                        }

                        r.controller = r.controller || name;
                        r.controllerAs = r.controllerAs || "$";
                    }
                    $routeProvider.when(r.url, r);
                }
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    }

    // Define the routes - since this goes right to an app.constant, no use for a class
    // Could make it a static property of the RouteConfigurator class
    function getRoutes(): IAppRoute[] {
        return Routes;
    }

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config([
        '$routeProvider', 'routes', '$locationProvider',
        ($routeProvider, routes/*, $locationProvider*/) => {
            /*
                        $locationProvider.html5Mode({
                            enabled: true,
                            requireBase: false
                        });
            */
            return new RouteConfigurator($routeProvider, routes);
        }
    ]);


    //#region - Переход на страницу логина при попытке получить доступ к страницам, требующим авторизации -
    app.run(["$location", "$rootScope", "$route", "config", '$auth', ($location, $rootScope, $route, config: IConfigurations, $auth: IAutenticationService) => {

/*
        var isRouteGranted = (route : IAppRoute) => {
            return route && !route.isInvisible && (!route.auth || !angular.isArray(route.roles) || route.roles.contains($auth.LoggedUser.Employee.UserRole))
        };
*/


        $rootScope.$on('$locationChangeStart', (evt, next, current) => {
            if (!$rootScope.$redirectToLogin) {
                $rootScope.$priorLocation = "/";
                if (current) {
                    $rootScope.$priorLocation = current.split('#', 2)[1] || "/";
                }
            } else
                $rootScope.$redirectToLogin = undefined;

            var path = $location.path();
            if (path !== "/" && path.EndsWith("/")) {
                path = path.substring(0, path.length - 1);
            }

            var nextRoute = $route.routes[path];
            if (nextRoute) {
                if (nextRoute.originalPath === "") {
                    $location.path("/");
                    $rootScope.$broadcast(config.events.controllerActivateSuccess);
                }
                else if (nextRoute.auth) {
                    if (!$auth.IsLoggedIn) {
                        // if page requires authorization but user is not logged in
                        if (current.Contains("/#/login")) {
                            // ignore login page
                            evt.preventDefault();
                            $rootScope.$broadcast(config.events.controllerActivateSuccess);
                        } else {
                            // redirect to login page
                            $rootScope.$priorLocation = path;
                            $rootScope.$redirectToLogin = true;
                            $location.path("/login");
                            $rootScope.$broadcast(config.events.controllerActivateSuccess);
                            evt.preventDefault();
                        }
                    } 
                    else if (!RouteConfigurator.IsRouteGranted(nextRoute)) {
                        // if user is logged in but has no access rights
                        // try to find route enabled route
                        var route = $route.routes["/"];
                        if (!RouteConfigurator.IsRouteGranted(route)) {
                            route = undefined;
                            for (var rName in $route.routes) {
                                if (rName === "null" || rName === "" || rName.EndsWith("/")) continue;
                                var r = <IAppRoute>$route.routes[rName];
                                if (r.url && !r.url.StartsWith("/login") && RouteConfigurator.IsRouteGranted(r)) {
                                    route = r;
                                    break;
                                }
                            }
                        }

                        if (route) {
                            $location.path(route.originalPath);
                            $rootScope.$broadcast(config.events.controllerActivateSuccess);
                            evt.preventDefault();
                        }
                        else {
                        // there is no any granted route - redirect to special page
                            $location.path("/login");
                            $rootScope.$broadcast(config.events.controllerActivateSuccess);
                            evt.preventDefault();
                        }
                    }
                }
            }
        });
    }]);    
    //#endregion

}
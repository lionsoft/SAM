'use strict';

module App.Services {

    export interface ICitiesService extends ICRUDService<ICity> {
    }

    class CitiesService extends CRUDService<ICity> implements ICitiesService {
        TypeDescription = "City";
        get ApiService() { return app.api.Cities; }
    }

    app.service("samCities", CitiesService.Factory());
} 
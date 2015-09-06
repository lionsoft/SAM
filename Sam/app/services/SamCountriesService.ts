'use strict';

module App.Services {

    export interface ICountriesService extends ICRUDService<ICountry> {
    }

    class CountriesService extends CRUDService<ICountry> implements ICountriesService {
        TypeDescription = "Country";
        get ApiService() { return app.api.Countries; }
    }

    app.service("samCountries", CountriesService.Factory());
} 
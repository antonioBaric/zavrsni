app.factory('pregledFacotry', function ($http, $q) {

    var apiString = '/api/pregled/';

    return {
        getAllPregledi: function () {
            return $http.get(apiString).then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getAllNaziviPregleda: function () {
            return $http.get(apiString + 'nazivPregleda').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getPregledById: function (pregledId) {
            return $http.get(apiString + pregledId).then(function (response) {
                return response.data;
            })
            .catch(function (e) {
                $q.reject(e);
            })
        }
    };
});
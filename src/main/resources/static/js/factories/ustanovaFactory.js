app.factory('ustanovaFactory', function ($http, $q) {

    var apiString = '/api/ustanova/';

    return {
        getAllVrsteUstanova: function () {
            return $http.get(apiString + 'vrstaUstanove').then(function(response) {
                return response.data;
            })
                .catch(function (response) {
                    $q.reject(response);
                });
        },

        getAllSpecijalizacijeUstanova: function () {
            return $http.get(apiString + 'specijalizacijaUstanove').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getAllUstanove: function () {
            return $http.get(apiString).then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getUstanovaById: function (id) {
            return $http.get(apiString + id).then(function(response){
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            })
        }
    };
});
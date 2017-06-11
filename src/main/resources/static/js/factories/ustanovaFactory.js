app.factory('ustanovaFactory', function ($http, $q) {

    return {
        getAllVrsteUstanova: function () {
            return $http.get('/api/ustanova/vrstaUstanove').then(function(response) {
                return response.data;
            })
                .catch(function (response) {
                    $q.reject(response);
                });
        },

        getAllSpecijalizacijeUstanova: function () {
            return $http.get('/api/ustanova/specijalizacijaUstanove').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getAllUstanove: function () {
            return $http.get('/api/ustanova').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getUstanovaById: function (id) {
            return $http.get('/api/ustanova/' + id).then(function(response){
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            })
        }
    };
});
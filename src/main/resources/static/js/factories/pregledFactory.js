app.factory('pregledFacotry', function ($http, $q) {

    return {
        getAllPregledi: function () {
            return $http.get('/api/pregled').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getAllNaziviPregleda: function () {
            return $http.get('/api/pregled/nazivPregleda').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        }
    };
});
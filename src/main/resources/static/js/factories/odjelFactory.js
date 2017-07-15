app.factory('odjelFacotry', function ($http, $q) {

    var apiString = '/api/odjel/';

    return {
        getAllNaziviOdjela: function () {
            return $http.get(apiString + 'nazivOdjela').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getAllOdjeli: function () {
            return $http.get(apiString).then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getOdjelById: function (id) {
            return $http.get(apiString + id).then(function (response) {
                return response.data;
            })
            .catch(function (e) {
                $q.reject(e);
            })
        }
    };
});
app.factory('odjelFacotry', function ($http, $q) {

    return {
        getAllNaziviOdjela: function () {
            return $http.get('/api/odjel/nazivOdjela').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getAllOdjeli: function () {
            return $http.get('/api/odjel').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getOdjelById: function (id) {
            return $http.get('/api/odjel/' + id).then(function (response) {
                return response.data;
            })
            .catch(function (e) {
                $q.reject(e);
            })
        }
    };
});
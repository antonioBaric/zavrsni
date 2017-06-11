app.factory('mjestoFacotry', function ($http, $q) {

    return {
        getAllMjesta: function () {
            return $http.get('/api/mjesto').then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        }
    };
});
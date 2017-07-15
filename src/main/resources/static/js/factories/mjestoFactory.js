app.factory('mjestoFacotry', function ($http, $q) {

    var apiString = '/api/mjesto/';

    return {
        getAllMjesta: function () {
            return $http.get(apiString).then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        }
    };
});
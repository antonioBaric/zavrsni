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

        getAllActiveUstanove: function () {
            return $http.get(apiString + "active")
            .then(function(response) {
                return $q.resolve(response.data);
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
        },

        getActiveUstanovaById: function (id) {
            return $http.get(apiString + "active/" + id).then(function(response){
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        updateUstanova: function (ustanova) {
            return $http.put(apiString, ustanova)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in updating ustanova (ustanovaFactory)", e);
            });
        },

        deleteUstanovaById: function (id) {
            return $http.delete(apiString + id)
            .then(function (response) {
                return $q.resolve(response.status);
            })
            .catch(function (e) {
                console.log(e);
            });
        },

        insertNewUstanova: function (newUstanova) {
            newUstanova.active = false;
            return $http.post(apiString, newUstanova)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in inserting new Ustanova", e);
            });
        }
    };
});
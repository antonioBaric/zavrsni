app.factory('pregledFacotry', function ($http, $q) {

    var apiString = '/api/pregled/';
    var apiStringNazivPregleda = '/api/pregled/nazivPregleda';

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
            return $http.get(apiStringNazivPregleda).then(function(response) {
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
        },

        getAllActivePregledi: function () {
            return $http.get(apiString + "active")
            .then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        updatePregled: function (pregled) {
            return $http.put(apiString, pregled)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in updating pregled (pregledFactory)", e);
            });
        },

        deletePregledById: function (id) {
            return $http.delete(apiString + id)
            .then(function (response) {
                return $q.resolve(response.status);
            })
            .catch(function (e) {
                console.log(e);
            });
        },

        getOdjelOfThisPregled: function (pregledId) {
            return $http.get(apiString + "getOdjel/" + pregledId)
            .then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getOdjelIdOfThisPregled: function (pregledId) {
            return $http.get(apiString + "getOdjelId/" + pregledId)
            .then(function(response) {
                return response;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getOdjelImeOfThisPregled: function (pregledId) {
            return $http.get(apiString + "getOdjelIme/" + pregledId)
            .then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        updateNazivPregleda: function (nazivPregleda) {
            return $http.put(apiStringNazivPregleda, nazivPregleda)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in updating nazivPregleda (pregledFactory)", e);
            });
        },

        insertNewNazivPregleda: function (newNazivPregleda) {
            return $http.post(apiStringNazivPregleda, newNazivPregleda)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
               console.log("error ")
            });
        }
    };
});
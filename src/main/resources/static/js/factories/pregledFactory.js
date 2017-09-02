app.factory('pregledFacotry', function ($http, $q) {

    var apiString = '/api/pregled/';
    var apiStringNazivPregleda = '/api/pregled/nazivPregleda';
    var apiStringGetAllDatesOfTakenPregledId = '/api/pregled/getAllTakenDatesByPregledId/';
    var apiStringCheckIfDateIsAvailable = '/api/pregledPacijenta/checkIfDateOfPregledIsAvailable/';

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
                return response.data;
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
        },

        insertNewPregled: function (newPregled, odjelId) {
            newPregled.active = false;
            return $http.post(apiString + odjelId, newPregled)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in inserting pregled (pregledFactory)", e);
            });
        },

        getActivePregledById: function (id) {
            return $http.get(apiString + "active/" + id).then(function(response){
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getOdjelBasicInformation: function (pregledId) {
            return $http.get(apiString + "getOdjelBasicInformation/" + pregledId).then(function(response){
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getAllDatesOfTakenPregledId: function (pregledId) {
            return $http.get(apiStringGetAllDatesOfTakenPregledId + pregledId).then(function(response){
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        checkIfDateIsAvailable: function (pickedDateTimestamp, pregledId) {
            return $http.get(apiStringCheckIfDateIsAvailable + pregledId + "/" + pickedDateTimestamp).then(function(response){
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        }
    };
});
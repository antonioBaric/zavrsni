app.factory('odjelFactory', function ($http, $q) {

    var apiString = '/api/odjel/';
    var apiStringNaziv = '/api/odjel/nazivOdjela/';
    //var apiStringInsertOdjel = '/api/odjel/insertNewOdjelToUstanova/';

    return {
        getAllNaziviOdjela: function () {
            return $http.get(apiStringNaziv).then(function(response) {
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
        },

        getAllActiveOdjeli: function () {
            return $http.get(apiString + "active")
            .then(function(response) {
                return response.data;
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        updateOdjel: function (odjel) {
            return $http.put(apiString, odjel)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in updating odjel (odjelFactory)", e);
            });
        },

        deleteOdjelById: function (id) {
            return $http.delete(apiString + id)
            .then(function (response) {
                return $q.resolve(response.status);
            })
            .catch(function (e) {
                console.log(e);
            });
        },

        getUstanovaOfThisOdjel: function (odjelId) {
            return $http.get(apiString + "getUstanova/" + odjelId)
            .then(function(response) {
                return $q.resolve(response.data);
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getUstanovaIdOfThisOdjel: function (odjelId) {
            return $http.get(apiString + "getUstanovaId/" + odjelId)
            .then(function(response) {
                return $q.resolve(response.data);
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        getUstanovaImeOfThisOdjel: function (odjelId) {
            return $http.get(apiString + "getUstanovaIme/" + odjelId)
            .then(function(response) {
                return $q.resolve(response.data);
            })
            .catch(function (response) {
                $q.reject(response);
            });
        },

        deleteNazivOdjela: function (id) {
            return $http.delete(apiStringNaziv + id)
            .then(function (response) {
                return $q.resolve(response.status);
            })
            .catch(function (e) {
                console.log(e);
            });
        },

        updateNazivOdjela: function (nazivOdjel) {
            return $http.put(apiStringNaziv, nazivOdjel)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in updating odjel (odjelFactory)", e);
            });
        },

        insertNewNazivOdjela: function (nazivOdjela) {
            return $http.post(apiStringNaziv, nazivOdjela)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error while inserting new nazivOdjela", e);
            });
        },

        insertNewOdjelToUstanova: function (newOdjel, ustanovaId) {
            newOdjel.active = false;
            return $http.post(apiString + ustanovaId, newOdjel)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in inserting new odjel to ustanova", e);
                $q.reject(e);
            });
        },

        getActiveOdjelById: function (id) {
            return $http.get(apiString + "active/" + id).then(function(response){
                return $q.resolve(response.data);
            })
            .catch(function (response) {
                $q.reject(response);
            });
        }
    };
});
app.controller('odjeliController', function ($scope) {

    if ($rootScope.role === "admin") {
        //dohvatiti sve odjel
    } else {
        //dohvatiti odjele samo ako su aktivni (ako nije admin)
    }

});

app.controller('odjelController', function ($scope, $rootScope, $routeParams, odjelFactory, pregledFacotry) {

    var odjelId = $routeParams.odjelId;

    if ($rootScope.role === "admin") {
        odjelFactory.getOdjelById(odjelId).then(function (data) {
            $scope.odjel = data;
            $scope.updatedOdjel = jQuery.extend(true, {}, $scope.odjel);
        })
        .catch(function (e) {
            console.log("odjelFactory.getOdjelById nije uspio: ", e);
        });

        odjelFactory.getAllNaziviOdjela()
        .then(function (naziviOdjela) {
            $scope.naziviOdjela = naziviOdjela;
        })
        .catch(function (e) {
            console.log("odjelFactory.getAllNaziviOdjela nije uspio: ", e);
        });

        pregledFacotry.getAllNaziviPregleda()
        .then(function (naziviPregleda) {
            $scope.naziviPregleda = naziviPregleda;
        })
        .catch(function (e) {
            console.log("pregledFacotry.getAllNaziviPregleda() nije uspio: ", e);
        });

    } else {
        odjelFactory.getActiveOdjelById(odjelId).then(function (data) {
            $scope.odjel = data;
        })
        .catch(function (e) {
            console.log("odjelFactory.getActiveOdjelById nije uspio: ", e);
        });
    }



    $scope.updateOdjel = function (updatedOdjel) {
        if ($rootScope.role === "admin") {
            odjelFactory.updateOdjel(updatedOdjel)
            .then(function (data) {
                $scope.odjel = data;
            })
            .catch(function (e) {
                console.log("odjelFactory.updateOdjel nije uspio: ", e);
            });
        }
    };

    $scope.addNewPregled = function (newPregled) {
        if ($rootScope.role === "admin") {
            pregledFacotry.insertNewPregled(newPregled, $scope.odjel.id)
            .then(function (newPregled) {
                $scope.odjel.pregledi.push(newPregled);
            })
            .catch(function (e) {
                console.log("error while inserting new pregled to odjel(odjelController)") ;
            });
        }
    };
    
    $scope.activatePregled = function (pregled) {
        pregled.active = true;
        pregledFacotry.updatePregled(pregled)
        .then(function (data) {
            pregled = data;
        })
        .catch(function (e) {
            console.log("Error in activating pregled: ", e);
        });
    };

    $scope.deactivatePregled = function (pregled) {
        pregled.active = false;
        pregledFacotry.updatePregled(pregled)
        .then(function (data) {
            pregled = data;
        })
        .catch(function (e) {
            console.log("Error in deactivating pregled: ", e);
        });
    };

    $scope.deletePregled = function (pregledId, index) {
        if ($rootScope.role === "admin") {
            pregledFacotry.deletePregledById(pregledId)
            .then(function (status) {
                if (status === 200) {
                    $scope.odjel.pregledi.splice(index, 1);
                }
            })
            .catch(function (e) {
                console.log("error while deleting prregled from odjel(odjelController)") ;
            });
        }
    }

});
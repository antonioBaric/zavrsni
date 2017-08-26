app.controller('ustanoveController', function ($scope, ustanovaFactory, mjestoFacotry) {
    //get all active ustanove! & odjele & preglede
    ustanovaFactory.getAllActiveUstanove().then(function (data) {
        $scope.ustanove = data;
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getAllUstanove nije uspjelo: ", e);
    });

    mjestoFacotry.getAllMjesta()
    .then(function (mjesta) {
        $scope.gradovi = mjesta;
    })
    .catch(function (e) {
        console.log("mjestoFacotry.getAllMjesta() nije uspjelo", e);
    });

    ustanovaFactory.getAllVrsteUstanova()
    .then(function (vrsteUstanova) {
        $scope.vrsteUstanova = vrsteUstanova;
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getAllVrsteUstanova() nije uspjelo", e);
    });

    ustanovaFactory.getAllSpecijalizacijeUstanova()
    .then(function (specijalizacijeUstanova) {
        $scope.specijalizacijeUstanova = specijalizacijeUstanova;
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getAllSpecijalizacijeUstanova() nije uspjelo", e);
    });



});

app.controller('ustanovaController', function ($scope, $rootScope, $routeParams, ustanovaFactory, mjestoFacotry, odjelFactory) {

    var ustanovaId = $routeParams.ustanovaId;
    if ($rootScope.role === "admin") {
        ustanovaFactory.getUstanovaById(ustanovaId).then(function (data) {
            $scope.ustanova = data;
            $scope.updatedUstanova = jQuery.extend(true, {}, $scope.ustanova);
        })
        .catch(function (e) {
            console.log("ustanovaFactory.getUstanovaById nije uspjelo: ", e);
        });

        ustanovaFactory.getAllVrsteUstanova()
        .then(function (vrsteUstanova) {
            $scope.vrsteUstanova = vrsteUstanova;
        })
        .catch(function (e) {
            console.log("error while fetching all 'vrsteUstanova' in  ustanoveController: ", e);
        });

        ustanovaFactory.getAllSpecijalizacijeUstanova()
        .then(function (specijalizacijeUstanova) {
            $scope.specijalizacijeUstanova = specijalizacijeUstanova;
        })
        .catch(function (e) {
            console.log("error while fetching all 'specijalizacijeUstanova' in  ustanoveController: ", e);
        });

        mjestoFacotry.getAllMjesta()
        .then(function (mjesta) {
            $scope.mjesta = mjesta;
        })
        .catch(function (e) {
            console.log("error while fetching all 'mjesta' in  ustanoveController: ", e);
        });

        odjelFactory.getAllNaziviOdjela()
        .then(function (naziviOdjela) {
            $scope.naziviOdjela = naziviOdjela;
        })
        .catch(function (e) {
            console.log("errir while fetching all 'nazivi odjela' in ustanovaController", e);
        });

    } else {
        ustanovaFactory.getActiveUstanovaById(ustanovaId).then(function (data) {
            $scope.ustanova = data;
        })
        .catch(function (e) {
            console.log("ustanovaFactory.getActiveUstanovaById nije uspjelo: ", e);
        });
    }



    $scope.updateUstanova = function (updatedUstanova) {
        if ($rootScope.role === "admin") {
            ustanovaFactory.updateUstanova(updatedUstanova)
            .then(function (data) {
                $scope.ustanova = data;
            })
            .catch(function (e) {
               console.log("Error when updating ustanova in ustanovaController",e);
            });
        }
    };

    $scope.activateOdjel = function (odjel) {
        if ($rootScope.role === "admin") {
            odjel.active = true;
            odjelFactory.updateOdjel(odjel)
            .then(function (data) {
                odjel = data;
            })
            .catch(function (e) {
                console.log("error in activating odjel", e);
            });
        }
    };

    $scope.deactivateOdjel = function (odjel) {
        if ($rootScope.role === "admin") {
            odjel.active = false;
            odjelFactory.updateOdjel(odjel)
            .then(function (data) {
                odjel = data;
            })
            .catch(function (e) {
                console.log("error in updating odjel", e);
            });
        }
    };

    $scope.deleteOdjel = function (odjelId, index) {
        if ($rootScope.role === "admin") {
            odjelFactory.deleteOdjelById(odjelId)
            .then(function (status) {
                if (status === 200) {
                    $scope.ustanova.odjeli.splice(index, 1);
                }
            })
            .catch(function (e) {
                console.log("Error in deleting odjel(ustanovaController)", e);
            });
        }
    };

    $scope.addNewOdjel = function (newOdjel) {
        if ($rootScope.role === "admin") {
            odjelFactory.insertNewOdjelToUstanova(newOdjel, $scope.ustanova.id)
            .then(function (data) {
                $scope.ustanova.odjeli.push(data);
            })
            .catch(function (e) {
               console.log("error while inserting new odjel to ustanova(ustanovaController)") ;
            });
        }
    }

});
app.controller('ustanoveController', function ($scope, ustanovaFactory) {
    //get all active ustanove! & odjele & preglede
    ustanovaFactory.getAllActiveUstanove().then(function (data) {
        $scope.ustanove = data;
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getAllUstanove nije uspjelo: ", e);
    });



});

app.controller('ustanovaController', function ($scope, $rootScope, $routeParams, ustanovaFactory, mjestoFacotry) {

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

    } else {
        ustanovaFactory.getActiveUstanovaById(ustanovaId).then(function (data) {
            $scope.ustanova = data;
        })
        .catch(function (e) {
            console.log("ustanovaFactory.getUstanovaById nije uspjelo: ", e);
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
    }

});
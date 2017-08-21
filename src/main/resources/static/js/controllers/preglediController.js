app.controller('preglediController', function ($scope) {

    if ($rootScope.role === "admin") {
        //dohvatiti sve preglede
    } else {
        //dohvatiti preglede samo ako su aktivni (ako nije admin)
    }

});

app.controller('pregledController', function ($scope, $rootScope, $routeParams, pregledFacotry, userInfoFactory) {

    var pregledId = $routeParams.pregledId;

    if ($rootScope.role === "admin") {
        pregledFacotry.getPregledById(pregledId).then(function (data) {
            $scope.pregled = data;
            $scope.updatedPregled = jQuery.extend(true, {}, $scope.pregled);
        })
        .catch(function (e) {
            console.log("pregledFacotry.getPregledById nije uspio: ", e);
        });

        pregledFacotry.getAllNaziviPregleda()
        .then(function (naziviPregleda) {
            $scope.naziviPregleda = naziviPregleda;
        })
        .catch(function (e) {
            console.log("pregledFacotry.getAllNaziviPregleda nije uspio: ", e);
        });
    } else {
        pregledFacotry.getActivePregledById(pregledId).then(function (data) {
            $scope.pregled = data;
        })
        .catch(function (e) {
            console.log("pregledFacotry.getActivePregledById nije uspio: ", e);
        });
    }

    $scope.updatePregled = function (updatedPregled) {
        pregledFacotry.updatePregled(updatedPregled)
        .then(function (data) {
            $scope.pregled = data;
        })
        .catch(function (e) {
            console.log("pregledFacotry.updatePregled nije uspio: ", e);
        });
    };
    
    $scope.prijavaPregleda = function (userId, pregledId) {
        if ($rootScope.role === "pacijent") {
            userInfoFactory.addPregledToUser(userId, pregledId)
            .then(function (newPregled) {
                $rootScope.userInfo.pacijent.preglediPacijenta.push(newPregled);
                alert("Uspjesno ste se prijavili za pregled.");
            })
            .catch(function (e) {
                console.log("userInfoFactory.insertNewPregled nije uspio: ", e);
            });
        }
    };

});
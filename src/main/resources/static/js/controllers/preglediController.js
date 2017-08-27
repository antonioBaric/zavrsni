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
            if ($rootScope.userInfo) {
                $scope.accessToSign = true;
                var nextDateOfPregled = new Date($scope.pregled.nextDate);
                var today = new Date();
                today.setHours(0,0,0,0);
                var preglediPacijenta = $rootScope.userInfo.pacijent.preglediPacijenta;
                preglediPacijenta.forEach(function (it) {
                    var lastDateOfUserPregled = new Date(it.date);
                    if (it.pregled.id === $scope.pregled.id && lastDateOfUserPregled <= nextDateOfPregled && lastDateOfUserPregled >= today) {
                        $scope.accessToSign = false;
                    }
                });
            }
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
        if ($rootScope.role === "pacijent" && $rootScope.userInfo.status === 1) {
            userInfoFactory.addPregledToUser(userId, pregledId)
            .then(function (newPregled) {
                $rootScope.userInfo.pacijent.preglediPacijenta.push(newPregled);
                return pregledFacotry.getActivePregledById($scope.pregled.id)
            })
            .then(function (pregled) {
                $scope.pregled = pregled;
                $scope.accessToSign = false;
                alert("Uspjesno ste se prijavili za pregled.");
            })
            .catch(function (e) {
                console.log("userInfoFactory.insertNewPregled nije uspio: ", e);
            });
        }
    };

});
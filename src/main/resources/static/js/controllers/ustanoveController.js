app.controller('ustanoveController', function ($scope, ustanovaFactory) {
    //get all active ustanove! & odjele & preglede
    ustanovaFactory.getAllActiveUstanove().then(function (data) {
        $scope.ustanove = data;
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getAllUstanove nije uspjelo: ", e);
    });



});

app.controller('ustanovaController', function ($scope, $routeParams, ustanovaFactory) {

    var ustanovaId = $routeParams.ustanovaId;
    ustanovaFactory.getUstanovaById(ustanovaId).then(function (data) {
        $scope.ustanova = data;
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getUstanovaById nije uspjelo: ", e);
    })

});
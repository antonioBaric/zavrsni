app.controller('odjeliController', function ($scope) {

});

app.controller('odjelController', function ($scope, $routeParams, odjelFactory) {

    var odjelId = $routeParams.odjelId;
    odjelFactory.getOdjelById(odjelId).then(function (data) {
        $scope.odjel = data;
    })
    .catch(function (e) {
        console.log("odjelFactory.getOdjelById nije uspio: ", e);
    })

});
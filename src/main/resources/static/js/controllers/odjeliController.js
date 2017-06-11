app.controller('odjeliController', function ($scope) {

});

app.controller('odjelController', function ($scope, $routeParams, odjelFacotry) {

    var odjelId = $routeParams.odjelId;
    odjelFacotry.getOdjelById(odjelId).then(function (data) {
        $scope.odjel = data;
    })
    .catch(function (e) {
        console.log("odjelFacotry.getOdjelById nije uspio: ", e);
    })

})
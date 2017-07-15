app.controller('preglediController', function ($scope) {



});

app.controller('pregledController', function ($scope, $routeParams, pregledFacotry) {

    var pregledId = $routeParams.pregledId;
    pregledFacotry.getPregledById(pregledId).then(function (data) {
        $scope.pregled = data;
    })
    .catch(function (e) {
        console.log("pregledFacotry.getPregledById nije uspio: ", e);
    });

});
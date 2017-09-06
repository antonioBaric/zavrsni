app.controller('statisticsController', function ($rootScope, $scope, ustanovaFactory, odjelFactory, pregledFacotry, mjestoFacotry) {

    mjestoFacotry.getAllMjesta()
    .then(function (data) {
        $scope.mjesta = [{id: null, naziv: 'Svi'}];
        $scope.mjesta = $scope.mjesta.concat(data);
    })
    .then(function () {

    })
    .catch(function (e) {
        console.log("Error while fetching all data: ",e);
    });


    $scope.generateStatistics = function () {

    };

});
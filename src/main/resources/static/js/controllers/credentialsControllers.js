app.controller('loginController', function ($rootScope, $scope, authFactory) {

    $scope.login = function () {
        $rootScope.authenticationError = false;
        authFactory.login($scope.username, $scope.password);
    }

});

app.controller('logoutController', function (authFactory) {

    authFactory.logout();

});
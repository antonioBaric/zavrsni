app.controller('credentialController', function ($rootScope, $scope, authFactory, userInfoFactory, $location) {

    $scope.login = function () {
        $rootScope.authenticationError = false;
        authFactory.login($scope.username, $scope.password)
        .then(function () {
            if ( $rootScope.authenticationError === true){
                $scope.username = '';
                $scope.password = '';
            }
        });
    }

    $scope.registrate = function () {
        $scope.userAlreadyExist = false;
        if ($scope.registrationForm.$valid && $scope.newUserInfo.password === $scope.password2) {
            userInfoFactory.insertNewUserInfo($scope.newUserInfo)
            .then(function (data) {
                if(data) {
                    alert("Uspješno ste se registrirali, molimo Vas da popunite ostale podatke nakon što se prijavite u aplikaciju " +
                        "klikom na svoje ime u gornjem desnom kutu, kako biste mogli koristiti sve usluge stranice.");
                    resetAllRegisterData();
                    $location.path("/").replace();
                } else {
                    $scope.userAlreadyExist = true;
                    $scope.newUserInfo.username = '';
                    $scope.newUserInfo.password = '';
                    $scope.password2 = '';
                }
            });
        } else {
            alert("Niste dobro upisali sve podatke!");
            resetAllRegisterData();
        }

        function resetAllRegisterData() {
            $scope.newUserInfo.ime = '';
            $scope.newUserInfo.prezime = '';
            $scope.newUserInfo.username = '';
            $scope.newUserInfo.email = '';
            $scope.newUserInfo.password = '';
            $scope.password2 = '';
        }

    }

    $scope.newUserInfo = {
        doktor: null,
        pacijent: null,
    };

});

app.controller('logoutController', function (authFactory) {

    authFactory.logout();

});
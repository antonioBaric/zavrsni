app.controller('userController', function ($rootScope, $scope, $location, userInfoFactory, ustanovaFactory, odjelFacotry, pregledFacotry) {

    $scope.updatedUser = jQuery.extend(true, {}, $rootScope.userInfo);
    $scope.activeFirstTime = jQuery.extend(true, {}, $rootScope.userInfo.active);
    $scope.updatingInProgress = false;
    $scope.updateSuccessful = false;
    $scope.screenShow = "korisnici";

    if ($rootScope.role === "admin") {
        userInfoFactory.getAllUsers()
        .then(function (users) {
            $scope.users = users;
        })
        .catch(function (e) {
           console.log("error when trying to fetch all users", e);
        });

        ustanovaFactory.getAllUstanove()
        .then(function (ustanove) {
            $scope.ustanove = ustanove;
        })
        .catch(function (e) {
            console.log("error when trying to fetch all 'ustanove'", e);
        });

        odjelFacotry.getAllOdjeli()
        .then(function (odjeli) {
            $scope.odjeli = odjeli;
        })
        .catch(function (e) {
            console.log("error when trying to fetch all 'odjeli'", e);
        });

        pregledFacotry.getAllPregledi()
        .then(function (pregledi) {
            $scope.pregledi = pregledi;
        })
        .catch(function (e) {
            console.log("error when trying to fetch all 'pregledi'", e);
        });
    }

    $scope.changeScreen = function (part) {
        $scope.screenShow = part;
    };

    $scope.completeUser = function () {
        if ($scope.completeUserForm.$valid) {
            $rootScope.userInfo.active = true;
            userInfoFactory.updateUserInfo($rootScope.userInfo)
            .then(function (user) {
                $scope.updatedUser = $rootScope.userInfo = user;
                $scope.firstUpdateSuccess = true;
            })
            .catch(function (e) {
                console.log("Error in completing user", e);
            });
        }
    };
    
    $scope.updateUser = function () {
        if ($scope.updateUserForm.$valid) {
            if ($scope.password && $scope.password !== "" && $scope.password === $scope.password2) {
                $scope.updatedUser.password = $scope.password;
            }
            userInfoFactory.updateUserInfo($scope.updatedUser)
            .then(function (user) {
                $rootScope.userInfo = user;
                $scope.updateSuccessful = true;
                $scope.updatingInProgress = false;
            })
            .catch(function (e) {
               console.log("Error in updating user", e);
            });
        }
    };

    $scope.activateUser = function (user) {
        if ($rootScope.role === "admin") {
            user.active = true;
            userInfoFactory.updateUserInfo(user)
            .then(function (data) {
                user = data;
            })
            .catch(function (e) {
                console.log("Error in activating user", e);
            });
        }
    };

    $scope.deactivateUser = function (user) {
        if ($rootScope.role === "admin") {
            user.active = false;
            userInfoFactory.updateUserInfo(user)
            .then(function (data) {
                user = data;
            })
            .catch(function (e) {
                console.log("Error in deactivating user", e);
            });
        }
    };

    $scope.deleteUser = function (id, index) {
        if ($rootScope.role === "admin") {
            userInfoFactory.deleteUserById(id)
            .then(function (response) {
                if (response === 200) {
                    $scope.users.splice(index,1);
                }
            })
            .catch(function (e) {
               console.log(e);
            });
        }
    };
    
    $scope.activateUstanova = function (ustanova) {
        if ($rootScope.role === "admin") {

        }
    };
    
    $scope.deactivateUstanova = function () {
        if ($rootScope.role === "admin") {

        }
    };
    
    $scope.addNewUstanova = function () {
        if ($rootScope.role === "admin") {

        }
    };
    
    $scope.deleteUstanova = function () {
        if ($rootScope.role === "admin") {

        }
    };

    $scope.activateOdjel = function () {
        if ($rootScope.role === "admin") {

        }
    };

    $scope.deactivateOdjel = function () {
        if ($rootScope.role === "admin") {

        }
    };

    $scope.addNewOdjel = function () {
        if ($rootScope.role === "admin") {

        }
    };

    $scope.deleteOdjel = function () {
        if ($rootScope.role === "admin") {

        }
    };

    $scope.activatePregled = function () {
        if ($rootScope.role === "admin") {

        }
    };

    $scope.deactivatePregled = function () {
        if ($rootScope.role === "admin") {

        }
    };

    $scope.addNewPregled = function () {
        if ($rootScope.role === "admin") {

        }
    };

    $scope.deletePregled = function () {
        if ($rootScope.role === "admin") {

        }
    };

});
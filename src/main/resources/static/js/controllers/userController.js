app.controller('userController', function ($rootScope, $scope, $location, userInfoFactory) {

    $scope.updatedUser = jQuery.extend(true, {}, $rootScope.userInfo);

    $scope.activeFirstTime = jQuery.extend(true, {}, $rootScope.userInfo.active);

    $scope.updatingInProgress = false;
    $scope.updateSuccessful = false;

    $scope.completeUser = function () {
        if ($scope.completeUserForm.$valid) {
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
    }

});
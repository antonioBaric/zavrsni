app.factory('authFactory', function ($http, $q, $rootScope ,authService, sessionFactory) {

    return {

        login: function (username, password) {

            var config = {
                ignoreAuthModule: 'ignoreAuthModule',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };

            $http.post('/authenticate', $.param({username: username, password: password}), config).then(function (response) {
               authService.loginConfirmed(response.data);
            })
            .catch(function (response) {
                $rootScope.authenticationError = true;
                sessionFactory.invalidate();
                console.log(response);
            });
        },

        getAccount: function () {
            $rootScope.loadingAccount = true;
            $http.get('/api/user/getUser').then(function (response) {
                if (response.data && response.data !== "") {
                    authService.loginConfirmed(response.data);
                }

            })
        },

        logout: function () {
            $rootScope.authenticationError = false;
            $rootScope.authenticated = false;
            $rootScope.account = null;
            $http.get('/logout');
            sessionFactory.invalidate();
            authService.loginCancelled();
        },

        isAuthorized: function (authorizedRole) {
            var isAuthorized = false;
            isAuthorized = (!!sessionFactory.login && sessionFactory.userRoles.indexOf(authorizedRole) !== -1);
            return isAuthorized;
        }

    };
});

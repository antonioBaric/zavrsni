var app = angular.module('app', ['ngRoute', 'http-auth-interceptor']);

app.constant('USER_ROLES', {
    'admin': 'admin',
    'doktor': 'doktor',
    'pacijent': 'pacijent'
});

app.config(function($routeProvider, $locationProvider, USER_ROLES) {
    $locationProvider.hashPrefix('');
	$routeProvider
	.when('/', {
		templateUrl: './views/home.html',
		controller: 'homeController',
        access: {
            loginRequired: false
        }
	})
	.when('/testOnly', {
		templateUrl: './views/testOnly.html',
        controller: 'testController',
        access: {
            loginRequired: true,
			authorizedRoles: [USER_ROLES.admin]
        }
    })
	.when('/login', {
		templateUrl: './views/login.html',
		controller: 'credentialController',
        access: {
            loginRequired: false
        }
	})
	.when('/logout', {
		template: '',
		controller: 'logoutController',
		access: {
			loginRequired: false
		}
	})
	.when('/user', {
		templateUrl: './views/user.html',
		controller: 'userController',
		access: {
			loginRequired: true,
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.doktor, USER_ROLES.pacijent]
		}
	})
	.when('/ustanove', {
		templateUrl: './views/ustanove.html',
		controller: 'ustanoveController',
        access: {
            loginRequired: false
        }
	})
	.when('/ustanove/:ustanovaId', {
		templateUrl: './views/ustanova.html',
		controller: 'ustanovaController',
        access: {
            loginRequired: false
        }
	})
	.when('/odjeli', {
		templateUrl: './views/odjeli.html',
		controller: 'odjeliController',
        access: {
			loginRequired: false
        }
	})
	.when('/odjeli/:odjelId', {
		templateUrl: './views/odjel.html',
		controller: 'odjelController',
        access: {
            loginRequired: false
        }
	})
	.when('/pregledi', {
		templateUrl: './views/pregledi.html',
		controller: 'preglediController',
        access: {
            loginRequired: false
        }
	})
	.when('/pregledi/:pregledId', {
		templateUrl: './views/pregled.html',
		controller: 'pregledController',
        access: {
            loginRequired: false
        }
	})
	.when('/oNama', {
		templateUrl: './views/oNama.html',
        access: {
            loginRequired: false
        }
	})
	.when('/kontakt', {
		templateUrl: './views/kontakt.html',
        access: {
            loginRequired: false
        }
	})
	.when('/loading', {
		templateUrl: './views/loading.html',
			access: {
			loginRequired: false
		}
	})
	.when('/error/403', {
		templateUrl: './views/error403.html'
	})
	.otherwise(
	{redirectTo: '/'}
	);
});

app.run(function ($rootScope, $location, $http, authFactory, sessionFactory, USER_ROLES, $q, $timeout) {

	sessionFactory.create(null);

	$rootScope.$on('$routeChangeStart', function (event, next) {
		if (next.originalPath === '/login' && $rootScope.authenticated) {
			console.log('if (next.originalPath === /login && $rootScope.authenticated)');
			event.preventDefault();
		} else if (next.access && next.access.loginRequired && !$rootScope.authenticated) {
			console.log('else if (next.access && next.access.loginRequired && !$rootScope.authenticated)');
            event.preventDefault();
            $rootScope.$broadcast("event:auth-loginRequired", {});
        } else if (next.access && next.access.loginRequired && !authFactory.isAuthorized(next.access.authorizedRoles)) {
			console.log('else if (next.access && !authFactory.isAuthorized(next.access.authorizedRole)');
			event.preventDefault();
			$rootScope.$broadcast("event:auth-forbidden", {});
		}
    });

//    $rootScope.$on('$routeChangeSuccess', function (scope, next, current) {
//       $rootScope.$evalAsync(function () {
//        	console.log('tu sam');
//            $.material.init();
//        });
//    });


	$rootScope.$on('event:auth-loginConfirmed', function (event, data) {
        if (!data || data === "") {
        	return;
		}
		console.log('login cnfirmed start ', data);
		$rootScope.loadingAccount = false;
        //var nextLocation = ($rootScope.requestedUrl ? $rootScope.requestedUrl : "/");
        var nextLocation = '/';
		sessionFactory.create(data);
		$rootScope.userInfo = sessionFactory.userInfo;
		$rootScope.authenticated = true;
		$rootScope.role = sessionFactory.userInfo.userRole.naziv;
		$location.path(nextLocation).replace();

	});

	$rootScope.$on('event:auth-loginRequired', function (event, data) {
        if ($rootScope.loadingAccount && data.status !== 401) {
            //$rootScope.requestedUrl = $location.path();
            $location.path('/login');
        } else {
            sessionFactory.invalidate();
            $rootScope.authenticated = false;
            $rootScope.role = null;
            $rootScope.loadingAccount = false;
            $location.path('/login');
        }
	});

    $rootScope.$on('event:auth-forbidden', function (rejection) {
        $rootScope.$evalAsync(function () {
            $location.path('/error/403').replace();
        	console.log('ERROR: ', rejection);
        });
    });

    $rootScope.$on('event:auth-loginCancelled', function () {
    	$location.path('/').replace();
    });

    authFactory.getAccount();

});
app.controller('homeController', function($scope, $http) {

	$scope.message = "Hello Angular :)";

	$http.get("/api/example/mapa").then(function (data) {
		data = data.data;
		console.log(data);
		console.log(data.content + " " + data.id);
    });

    $http.get("/api/example/broj").then(function (data) {
        data = data.data;
        console.log(data);
    });

    $http.get("/api/example/string").then(function (data) {
        data = data.data;
        console.log(data);
    });

    $http.get("/api/example/polje").then(function (data) {
        data = data.data;
        console.log(data[0] + ", " + data[1]);
    });

    $http.get("/api/example/objekt").then(function (data) {
        data = data.data;
        console.log(data.broj + ", " + data.string + ", " + data.polje[1]);
    });

});
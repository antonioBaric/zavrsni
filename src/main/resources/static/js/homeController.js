app.controller('homeController', function($scope, $http) {

	$scope.message = "Hello Angular ;)";
/*
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
        console.log(data);
        console.log(data.broj + ", " + data.string + ", " + data.polje[1]);
    });

    $http.get("/api/example/exampleDb").then(function (data) {
        data = data.data;
        console.log("-----from database-----");
        console.log("data: ", data);
        data.forEach(function (e) {
            console.log("polja: " + e.id + " " + e.ime + " " + e.opis);
        });
        console.log("-----end from database-----");
    });

    $http.get("/api/example/exampleDb/imeprimjer").then(function (data) {
        data = data.data;
        console.log("exambleDb/imeprimjer: ", data);
    });

    $http.put("/api/example/exampleDb/2", {id: "2", ime: "primjerupdate", opis:"ovo je update-ani primjer", broj:"2"}).then(function (data) {
        data = data.data;
        console.log("example update : ", data);
    }, function (e) {
        console.log("update nije uspio", e);
    });

    $http.post("/api/example/exampleDb", {ime: "novoIme", opis:"ovo je novi primjer", broj:"10"}).then(function (data) {
        data = data.data;
        console.log("example post : ", data);
    }, function (e) {
        console.log("post nije uspio", e);
    });

    $http.delete("/api/example/exampleDb/3").then(function (data) {
        data = data.data;
        console.log("example delete : ", data);
    }, function (e) {
        console.log("delete nije uspio", e);
    });
*/
    $http.get("/api/ustanova").then(function (data) {
        data = data.data;
        console.log("ustanova: ", data);
    }, function (e) {
        console.log("/api/ustanova nije uspio: ", e);
    });


    $http.get("/api/ustanova/vrstaUstanove").then(function (data) {
        data = data.data;
        console.log("vrstaUstanove : ", data);
    }, function (e) {
        console.log("/api/ustanova/vrstaUstanove nije uspio: ", e);
    });

    $http.get("/api/ustanova/specijalizacijaUstanove").then(function (data) {
        data = data.data;
        console.log("specijalizacijaUstanove : ", data);
    }, function (e) {
        console.log("/api/ustanova/specijalizacijaUstanove nije uspio: ", e);
    });

    $http.get("/api/mjesto").then(function (data) {
        data = data.data;
        console.log("mjesto: ", data);
    }, function (e) {
        console.log("/api/mjesto nije uspio: ", e);
    });

    $http.get("/api/odjel/nazivOdjela").then(function (data) {
        data = data.data;
        console.log("nazivOdjela: ", data);
    }, function (e) {
        console.log("/api/odjel/nazivOdjela nije uspio: ", e);
    });

    $http.get("/api/odjel/").then(function (data) {
        data = data.data;
        console.log("odjeli: ", data);
    }, function (e) {
        console.log("/api/odjel/ nije uspio: ", e);
    });

});
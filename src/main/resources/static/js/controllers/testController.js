app.controller('testController', function($scope, $http, mjestoFacotry, ustanovaFactory, odjelFacotry, pregledFacotry) {

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
    ustanovaFactory.getAllUstanove().then(function (data) {
        console.log("ustanove: ", data);
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getAllUstanove ", e);
    });


    ustanovaFactory.getAllVrsteUstanova().then(function(data) {
        console.log("vrste ustanova: ", data);
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getAllVrstaUstanova nije uspio: ", e);
    });

    ustanovaFactory.getAllSpecijalizacijeUstanova().then(function (data) {
        console.log("specijalizacije ustanova: ", data)
    })
    .catch(function (e) {
        console.log("ustanovaFactory.getAllSpecijalizacijeUstanova", e);
    });

    mjestoFacotry.getAllMjesta().then(function(data) {
        console.log("mjesta: ", data);
    })
    .catch(function (e) {
        console.log("mjestoFacotry.getAllMjesta nije uspio: ", e);
    });

    odjelFacotry.getAllNaziviOdjela().then(function (data) {
        console.log("nazivi odjela: ", data)
    })
    .catch(function (e) {
        console.log("odjelFacotry.getAllNaziviOdjela", e);
    });

    odjelFacotry.getAllOdjeli().then(function (data) {
        console.log("odjeli: ", data);
    })
    .catch(function (e) {
        console.log("odjelFacotry.getAllOdjeli", e);
    });

    pregledFacotry.getAllNaziviPregleda().then(function (data) {
        console.log("nazivi pregleda: ", data);
    })
    .catch(function (e) {
        console.log("pregledFacotry.getAllNaziviPregleda", e);
    });

    pregledFacotry.getAllPregledi().then(function (data) {
        console.log("pregledi: ", data);
    })
    .catch(function (e) {
        console.log("pregledFacotry.getAllPregledi: ", e);
    });

});
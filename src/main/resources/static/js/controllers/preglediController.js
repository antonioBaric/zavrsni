app.controller('preglediController', function ($scope) {

    if ($rootScope.role === "admin") {
        //dohvatiti sve preglede
    } else {
        //dohvatiti preglede samo ako su aktivni (ako nije admin)
    }

});

app.controller('pregledController', function ($scope, $rootScope, $routeParams, $q, pregledFacotry, userInfoFactory) {

    var pregledId = $routeParams.pregledId;

    if ($rootScope.role === "admin") {
        pregledFacotry.getPregledById(pregledId).then(function (data) {
            $scope.pregled = data;
            $scope.updatedPregled = jQuery.extend(true, {}, $scope.pregled);
        })
        .catch(function (e) {
            console.log("pregledFacotry.getPregledById nije uspio: ", e);
        });

        pregledFacotry.getAllNaziviPregleda()
        .then(function (naziviPregleda) {
            $scope.naziviPregleda = naziviPregleda;
        })
        .catch(function (e) {
            console.log("pregledFacotry.getAllNaziviPregleda nije uspio: ", e);
        });
    } else {
        pregledFacotry.getActivePregledById(pregledId).then(function (data) {
            $scope.pregled = data;
            setDateString();
            if ($rootScope.userInfo) {
                $scope.accessToSign = true;
                var nextDateOfPregled = $scope.minDate =  new Date($scope.pregled.nextDate);
                $scope.maxDate = new Date(
                    $scope.minDate.getFullYear(),
                    $scope.minDate.getMonth() + 6,
                    $scope.minDate.getDate()
                );
                var today = new Date();
                today.setHours(0,0,0,0);
                var preglediPacijenta = $rootScope.userInfo.pacijent.preglediPacijenta;
                preglediPacijenta.forEach(function (it) {
                    var lastDateOfUserPregled = new Date(it.date);
                    if (it.pregled.id === $scope.pregled.id /*&& lastDateOfUserPregled <= nextDateOfPregled*/ && lastDateOfUserPregled >= today) {
                        $scope.accessToSign = false;
                    }
                });
            }
        })
        .then(function () {
            pregledFacotry.getAllDatesOfTakenPregledId($scope.pregled.id)
                .then(function (dates) {
                    $scope.takenDates = dates;
                })
        })
        .catch(function (e) {
            console.log("pregledFacotry.getActivePregledById nije uspio: ", e);
        });
    }

    $scope.updatePregled = function (updatedPregled) {
        pregledFacotry.updatePregled(updatedPregled)
        .then(function (data) {
            $scope.pregled = data;
        })
        .catch(function (e) {
            console.log("pregledFacotry.updatePregled nije uspio: ", e);
        });
    };
    
    $scope.prijavaPregleda = function (userId, pregledId) {
        if ($rootScope.role === "pacijent" && $rootScope.userInfo.status === 1) {

            if ($scope.check()) {
                var timestamp = $scope.currentDate.getTime();
                userInfoFactory.addPregledToUser(userId, pregledId, timestamp)
                .then(function (newPregled) {
                    if (newPregled) {
                        $rootScope.userInfo.pacijent.preglediPacijenta.push(newPregled);
                        return pregledFacotry.getActivePregledById($scope.pregled.id)
                    } else {
                        alert("Termin za odabrani datum je zauzet, molimo Vas da izaberete neki drugi datum i vrijeme.");
                        return $q.reject("Termin pregleda je zauzet");
                    }
                })
                .then(function (pregled) {
                    $scope.pregled = pregled;
                    setDateString();
                    $scope.accessToSign = false;
                    alert("Uspjesno ste se prijavili za pregled.");
                })
                .catch(function (e) {
                    console.log("userInfoFactory.insertNewPregled nije uspio: ", e);
                });
            } else {
                alert("Potrebno je unijeti datum i vrijeme.");
            }

        }
    };

    function setDateString() {
        if($scope.pregled.nextDate) {
            $scope.currentDate = $scope.pregled.lastDateString = new Date ( $scope.pregled.nextDate);
            $scope.pregled.lastTimeString = $scope.pregled.lastDateString.toLocaleTimeString();
            $scope.pregled.lastDateString = $scope.pregled.lastDateString.toLocaleDateString();
            $scope.pregled.lastDateString = $scope.pregled.lastDateString.replace(/[/]/g, '.');
            getCurrentDateString();
        }
    }

    function getCurrentDateString() {
        $scope.currentDateString = $scope.currentDate.toLocaleDateString().replace(/[/]/g, '.');
    }

    $scope.validateDates = function (date) {
        date.setHours(8);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        var dayTimestamp = date.getTime();
        //return day === 0 || day === 6;

        if (jQuery.inArray(dayTimestamp, $scope.takenDates) !== -1) {
            return false;
        } else {
            return true;
        }

    };

    $scope.check = function () {
        var currentDate = $scope.datum;
        var currentTime = $scope.vrijeme;
        var currentHour = $scope.satPregleda;

        if (currentDate && currentHour) {
            currentDate.setHours(currentHour);
            currentDate.setMinutes(0);
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);
            $scope.currentDate = currentDate;
            getCurrentDateString();
            console.log("Datum i vrijeme narudzbe: ", currentDate);
            console.log("(SCOPE)Datum i vrijeme narudzbe: ", $scope.currentDate);
            return true;
        } else if (!currentDate && !currentHour) {
            return true;
        } else {
            return false;
        }
    };

    $scope.checkIfAvailable = function () {
        if ($scope.check()) {
            pregledFacotry.checkIfDateIsAvailable($scope.currentDate.getTime(), $scope.pregled.id)
            .then(function (data) {
                if (data) {
                    alert("Termin je slobodan!");
                } else {
                    alert("Termin je zauzet!");
                }
            })
            .catch(function (e) {
                console.log("checkIfAvailable failed", e);
            });
        } else {
            alert("Molimo upišite datum i vrijeme!");
        }


    };

    $scope.time = {
        twelve: new Date(),
        twentyfour: new Date()
    };

    $scope.message = {
        hour: 'Hour is required',
        minute: 'Minute is required',
        meridiem: 'Meridiem is required'
    };

    $scope.hours = [
        {str: "8:00", val: 8},
        {str: "10:00", val: 10},
        {str: "12:00", val: 12},
        {str: "14:00", val: 14}
    ];

});
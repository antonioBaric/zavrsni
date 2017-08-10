app.controller('userController', function ($rootScope, $scope, $location, $q, userInfoFactory, ustanovaFactory, odjelFacotry, pregledFacotry) {

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

        odjelFacotry.getAllNaziviOdjela()
        .then(function (naziviOdjela) {
            $scope.naziviOdjela = naziviOdjela;
            $scope.ustanoveOdjela = [];
            /*$scope.odjeli.forEach(function (odjel) {
                var ustanovaId = odjelFacotry.getUstanovaIdOfThisOdjel(odjel.id);
                var ustanovaIme = odjelFacotry.getUstanovaImeOfThisOdjel(odjel.id);
                $scope.ustanoveOdjela.push({
                    "id": ustanovaId,
                    "ime": ustanovaIme
                });
            })

            var promises = [];
            $scope.odjeli.forEach(function (odjel) {
                promises.push(
                    odjelFacotry.getUstanovaImeOfThisOdjel(odjel.id)
                        .then(function (ime) {
                            $scope.ustanoveOdjela.push(ime);
                        })
                );
            });

            Promise.all(promises).then(function (data) {
               console.log(data);
            });
            */
        })
        .catch(function (e) {
            console.log("error when trying to fetch all 'odjeli'", e);
        });

        pregledFacotry.getAllNaziviPregleda()
        .then(function (naziviPregleda) {
            $scope.naziviPregleda = naziviPregleda;
        })
        .catch(function (e) {
            console.log("error when trying to fetch all 'pregledi'", e);
        });
    }

    $scope.changeScreen = function (part) {
        $scope.screenShow = part;
    };

/* KASNIJE KORISTITI ? DA SE ZA SVAKI PRIKAZ ONDA UZIMAJU PODACI A NE SVI ODJEDNOM
    if ($rootScope.role === "admin") {
        userInfoFactory.getAllUsers()
        .then(function (users) {
            $scope.users = users;
        })
        .catch(function (e) {
            console.log("error when trying to fetch all users", e);
        });
    }

    $scope.changeScreen = function (part) {
        if ($rootScope.role === "admin") {
            if (part === "korisnici") {
                userInfoFactory.getAllUsers()
                .then(function (users) {
                    $scope.users = users;
                })
                .catch(function (e) {
                    console.log("error when trying to fetch all users", e);
                });
            } else if (part === "ustanove") {
                ustanovaFactory.getAllUstanove()
                .then(function (ustanove) {
                    $scope.ustanove = ustanove;
                })
                .catch(function (e) {
                    console.log("error when trying to fetch all 'ustanove'", e);
                });
            } else if (part === "odjeli") {
                odjelFacotry.getAllOdjeli()
                .then(function (odjeli) {
                    $scope.odjeli = odjeli;
                    $scope.ustanoveOdjela = [];
                })
                .catch(function (e) {
                    console.log("error when trying to fetch all 'odjeli'", e);
                });
            } else if (part === "pregledi") {
                pregledFacotry.getAllPregledi()
                .then(function (pregledi) {
                    $scope.pregledi = pregledi;
                })
                .catch(function (e) {
                    console.log("error when trying to fetch all 'pregledi'", e);
                });
            }
            $scope.screenShow = part;
        }
    };
*/
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
            ustanova.active = true;
            ustanovaFactory.updateUstanova(ustanova)
            .then(function (data) {
                ustanova = data;
            })
            .catch(function (e) {
                console.log("error in activating ustanova", e);
            });
        }
    };
    
    $scope.deactivateUstanova = function (ustanova) {
        if ($rootScope.role === "admin") {
            ustanova.active = false;
            ustanovaFactory.updateUstanova(ustanova)
            .then(function (data) {
                ustanova = data;
            })
            .catch(function (e) {
                console.log("error in updating ustanova", e);
            });
        }
    };
    
    $scope.addNewUstanova = function () {
        if ($rootScope.role === "admin") {

        }
    };
    
    $scope.deleteUstanova = function (id, index) {
        if ($rootScope.role === "admin") {
            ustanovaFactory.deleteUstanovaById(id)
            .then(function (response) {
                if (response === 200) {
                    $scope.ustanove.splice(index,1);
                }
            })
            .catch(function (e) {
                console.log(e);
            });
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

    $scope.deleteNazivOdjela = function (id, index) {
        if ($rootScope.role === "admin") {
            odjelFacotry.deleteNazivOdjela(id)
            .then(function (response) {
                if (response === 200) {
                    $scope.ustanove.splice(index,1);
                }
            })
            .catch(function (e) {
                console.log(e);
            });
        }
    };

/*    $scope.x = function (odjelId) {
         odjelFacotry.getUstanovaImeOfThisOdjel(odjelId).then(function (naziv) {
            $scope.name = naziv;
        });
    };
*//*
    $scope.getNazivUstanoveByOdjelId = function () {
        $scope.odjeli.forEach(function (odjel) {
           odjelFacotry.getUstanovaImeOfThisOdjel(odjel.id).then(function (ime) {
               $scope.ustanoveOdjela.push(ime);
           });
        });
    };
*/
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
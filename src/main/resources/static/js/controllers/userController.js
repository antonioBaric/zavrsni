app.controller('userController', function ($rootScope, $scope, $location, $q, userInfoFactory, ustanovaFactory, odjelFactory, pregledFacotry, mjestoFacotry) {

    $scope.updatedUser = jQuery.extend(true, {}, $rootScope.userInfo);
    $scope.activeFirstTime = jQuery.extend(true, {}, $rootScope.userInfo.status);
    $scope.updatingInProgress = false;
    $scope.updateSuccessful = false;
    //$scope.screenShow = "korisnici";
    $scope.editingNazivOdjela = -1;
    $scope.editingNazivPregelda = -1;

    if ($rootScope.role === "admin") {
        userInfoFactory.getAllUsers()
        .then(function (users) {
            $scope.users = users;
        })
        .catch(function (e) {
           console.log("error when trying to fetch all users", e);
        });
        // Napraviti sve u jednome chainu ?!
        ustanovaFactory.getAllUstanove()
        .then(function (ustanove) {
            $scope.ustanove = ustanove;
        })
        .catch(function (e) {
            console.log("error when trying to fetch all 'ustanove'", e);
        });

        odjelFactory.getAllNaziviOdjela()
        .then(function (naziviOdjela) {
            $scope.naziviOdjela = naziviOdjela;
            /*$scope.ustanoveOdjela = [];
            $scope.odjeli.forEach(function (odjel) {
                var ustanovaId = odjelFactory.getUstanovaIdOfThisOdjel(odjel.id);
                var ustanovaIme = odjelFactory.getUstanovaImeOfThisOdjel(odjel.id);
                $scope.ustanoveOdjela.push({
                    "id": ustanovaId,
                    "ime": ustanovaIme
                });
            })

            var promises = [];
            $scope.odjeli.forEach(function (odjel) {
                promises.push(
                    odjelFactory.getUstanovaImeOfThisOdjel(odjel.id)
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

        //dodatno:

        ustanovaFactory.getAllVrsteUstanova()
        .then(function (vrsteUstanova) {
            $scope.vrsteUstanova = vrsteUstanova;
        })
        .catch(function (e) {
            console.log("error while fetching all 'vrsteUstanova' in  userController: ", e);
        });

        ustanovaFactory.getAllSpecijalizacijeUstanova()
        .then(function (specijalizacijeUstanova) {
            $scope.specijalizacijeUstanova = specijalizacijeUstanova;
        })
        .catch(function (e) {
            console.log("error while fetching all 'specijalizacijeUstanova' in  userController: ", e);
        });

        mjestoFacotry.getAllMjesta()
        .then(function (mjesta) {
            $scope.mjesta = mjesta;
        })
        .catch(function (e) {
            console.log("error while fetching all 'mjesta' in  userController: ", e);
        });

    } else if ($rootScope.role === "pacijent") {
        var preglediPacijenta = $rootScope.userInfo.pacijent.preglediPacijenta;
        preglediPacijenta.forEach(function (it) {
            var date =  new Date(it.date);
            var today = new Date();
            today.setHours(0,0,0,0);
            if (date < today) {
                it.status = false;
            } else {
                it.status = true;
            }
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
                odjelFactory.getAllOdjeli()
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
        if ($rootScope.role === "pacijent" && $rootScope.userInfo.status === 0) {
            completeUser();
        }
    };

    function completeUser() {
        if ($scope.completeUserForm.$valid) {
            $rootScope.userInfo.status = 1;
            userInfoFactory.updateUserInfo($rootScope.userInfo)
                .then(function (user) {
                    if (user) {
                        $scope.updatedUser = $rootScope.userInfo = user;
                        $scope.firstUpdateSuccess = true;
                    } else {
                        $rootScope.userInfo.status = 0;
                        $scope.sameOib = true;
                        $rootScope.userInfo.oib = null;
                        $rootScope.userInfo.mobitel = null;
                    }
                })
                .catch(function (e) {
                    console.log("Error in completing user", e);
                });
        }
    }
    
    $scope.updateUser = function () {
       if ($rootScope.role === "admin") {
           updateUser();
       } else if ($rootScope.role === "pacijent" && $rootScope.userInfo.status === 1) {
            updateUser();
       }
    };

    function updateUser() {
        if ($scope.updateUserForm.$valid) {
            if ($scope.password && $scope.password !== "" && $scope.password === $scope.password2) {
                $scope.updatedUser.password = $scope.password;
            }
            userInfoFactory.updateUserInfo($scope.updatedUser)
                .then(function (user) {
                    if(user) {
                        $rootScope.userInfo = user;
                        $scope.updateSuccessful = true;
                        $scope.updatingInProgress = false;
                        $scope.sameOib = false;
                    } else {
                        $scope.sameOib = true;
                    }
                })
                .catch(function (e) {
                    console.log("Error in updating user", e);
                });
        }
    }

    $scope.activateUser = function (user) {
        if ($rootScope.role === "admin") {
            user.status = 1;
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
            user.status= -1;
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
    
    $scope.addNewUstanova = function (newUstanova) {
        if ($rootScope.role === "admin") {
            if ($scope.newUstanovaForm.$valid) {
                ustanovaFactory.insertNewUstanova(newUstanova)
                .then(function (newUstanova) {
                    $scope.ustanove.push(newUstanova);
                })
                .catch(function (e) {
                   console.log("error while inserting new Ustanova(userController)",e);
                });
            } else {
                alert("Niste dobro unijeli sve potrebne podatke!");
            }
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

    $scope.addNewNazivOdjela = function (newNazivOdjela) {
        if ($rootScope.role === "admin") {
            odjelFactory.insertNewNazivOdjela(newNazivOdjela)
            .then(function (data) {
                $scope.naziviOdjela.push(data);
                newNazivOdjela.naziv = "";
                newNazivOdjela.kratica = "";
                newNazivOdjela.opis = "";
            })
            .catch(function (e) {
                console.log("error in inserting new naziv odjela(userController)", e);
            });
        }
    };

    $scope.deleteNazivOdjela = function (id, index) {
        if ($rootScope.role === "admin") {
            odjelFactory.deleteNazivOdjela(id)
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

    $scope.updateNazivOdjel = function (nazivOdjela, updatedNazivOdjela) {
        if ($rootScope.role === "admin") {
            nazivOdjela.naziv = updatedNazivOdjela.naziv;
            nazivOdjela.kratica = updatedNazivOdjela.kratica;
            nazivOdjela.opis = updatedNazivOdjela.opis;
            odjelFactory.updateNazivOdjela(nazivOdjela)
            .then(function (data) {
                nazivOdjela = data;
                updatedNazivOdjela.naziv = "";
                updatedNazivOdjela.kratica = "";
                updatedNazivOdjela.opis = "";
            })
            .catch(function (e) {
                console.log("error in activating ustanova", e);
            });
        }
    };
/*
    $scope.editNazivOdjela = function (nazivOdjela) {
        if ($rootScope.role === "admin"){
            $scope.updatedNazivOdjela = jQuery.extend(true, {}, nazivOdjela);
        }
    };
*/
/*    $scope.x = function (odjelId) {
         odjelFactory.getUstanovaImeOfThisOdjel(odjelId).then(function (naziv) {
            $scope.name = naziv;
        });
    };
*//*
    $scope.getNazivUstanoveByOdjelId = function () {
        $scope.odjeli.forEach(function (odjel) {
           odjelFactory.getUstanovaImeOfThisOdjel(odjel.id).then(function (ime) {
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

    $scope.addNewNazivPregleda = function (newNazivPregleda) {
        if ($rootScope.role === "admin") {
            pregledFacotry.insertNewNazivPregleda(newNazivPregleda)
            .then(function (data) {
                $scope.naziviPregleda.push(data);
                newNazivPregleda.naziv = "";
                newNazivPregleda.opis = "";
            })
            .catch(function (e) {
                console.log("error while inserting new naziv pregled(userController)", e);
            });
        }
    };

    $scope.deleteNazivPregleda = function () {
        if ($rootScope.role === "admin") {

        }
    };
    
    $scope.updateNazivPrelgeda = function (nazivPregleda, updatedNazivPregleda) {
        if ($rootScope.role === "admin") {
            nazivPregleda.naziv = updatedNazivPregleda.naziv;
            nazivPregleda.opis = updatedNazivPregleda.opis;
            pregledFacotry.updateNazivPregleda(nazivPregleda)
            .then(function (data) {
                nazivPregleda = data;
                updatedNazivPregleda.naziv = "";
                updatedNazivPregleda.opis = "";
            })
            .catch(function (e) {
                console.log("error in activating ustanova", e);
            });
        }
    };
/*
    $scope.getOdjelBasicInformation = function (pregledId) {
        pregledFacotry.getOdjelBasicInformation(pregledId)
        .then(function (data) {
            $scope.odjelBasicInformation = data;
            return pregledFacotry.getOdjelIdOfThisPregled(pregledId)
        })
        .then(function (data) {
            return odjelFactory.getUstanovaImeOfThisOdjel(data)
        })
        .then(function (data) {
          $scope.ustanovaIme = data;
        })
        .catch(function (e) {
            console.log("error in getOdjelBasicInformation (userController)", e);
        });
    }
*/



});
app.factory('userInfoFactory', function ($http, $q) {

    var api = '/api/user/';
    var apiGetUserById = api + 'getUserById/';
    var apiInsertPregled = api + 'addNewPregledToUser/';

    return {
        
        insertNewUserInfo: function (newUserInfo) {
            newUserInfo.status = 0;
            return $http.post(api, newUserInfo)
                .then(function (response) {
                    //console.log("success: ", response);
                    return $q.resolve(response.data);
                })
                .catch(function (e) {
                    console.log("error", e);
                    //return $q.reject(e);
                });
        },

        updateUserInfo: function (newUserInfo) {
            return $http.put(api, newUserInfo)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in updating user (userInfoFactory)", e);
            });
        },

        getAllUsers: function () {
            return $http.get(api)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error in 'getAllUsers'", e);
            });
        },

        getUserById: function (userId) {
            return $http.get(apiGetUserById + userId)
            .then(function (response) {
                return $q.resolve(response.data)
            })
            .catch(function (e) {
                console.log("Error in getUserById: ", e);
            });
        },

        deleteUserById: function (id) {
            return $http.delete(api + id)
            .then(function (response) {
                return $q.resolve(response.status);
            })
            .catch(function (e) {
                console.log(e);
            });
        },
        
        addPregledToUser: function (userId, pregledId, timestamp) {
            return $http.post(apiInsertPregled + userId + "/" + pregledId + "/" + timestamp)
            .then(function (response) {
                return $q.resolve(response.data);
            })
            .catch(function (e) {
                console.log("error", e);
                //return $q.reject(e);
            });
        }
        
    };

});
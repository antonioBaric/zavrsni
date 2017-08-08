app.factory('userInfoFactory', function ($http, $q) {

    var api = '/api/user/';

    return {
        
        insertNewUserInfo: function (newUserInfo) {
            newUserInfo.active = false;
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
        }
        
    };

});
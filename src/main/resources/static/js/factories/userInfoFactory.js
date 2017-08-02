app.factory('userInfoFactory', function ($http, $q) {

    var api = '/api/user/';

    return {
        
        insertNewUserInfo: function (newUserInfo) {
            return $http.post(api, newUserInfo)
                .then(function (response) {
                    //console.log("success: ", response);
                    return $q.resolve(response.data);
                })
                .catch(function (e) {
                    console.log("error", e);
                    //return $q.reject(e);
                });
        }
        
    };

});
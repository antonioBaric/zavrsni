app.controller('userDetailsController', function ($rootScope, $scope, $routeParams, userInfoFactory) {

    var userId = $routeParams.userId;

    userInfoFactory.getUserById(userId)
    .then(function (data) {
        $scope.userInfo = data;
        var preglediPacijenta = data.pacijent.preglediPacijenta;
        preglediPacijenta.forEach(function (it) {
            var date =  new Date(it.date);
            var today = new Date();
            it.dateString = date.toLocaleDateString();
            it.dateString = it.dateString.replace(/[/]/g, '.');
            it.timeString = date.toLocaleTimeString();
            if (date < today) {
                it.status = false;
            } else {
                it.status = true;
            }
        });
    })
    .catch(function (e) {
        console.log("Error while fetching user by id(userDetailsController): ", e);
    });

});
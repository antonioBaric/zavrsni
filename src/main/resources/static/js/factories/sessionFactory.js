app.factory('sessionFactory', function ($http, $q) {

    return {

        create: function (data) {
            this.userInfo = data;
            this.invalidate = function () {
                this.userInfo = null;
            };

            return this;
        }
    };
});
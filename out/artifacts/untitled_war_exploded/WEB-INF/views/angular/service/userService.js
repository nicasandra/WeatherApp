app.service('SessionService', function () {
    var userIsAuthenticated = false;
    var currentUser = {};

    this.setUserAuthenticated = function (value) {
        userIsAuthenticated = value;
    };

    this.setCurrentUser = function (value) {
        currentUser=value;
    };

    this.getUserAuthenticated = function () {
        return userIsAuthenticated;
    };

    this.getCurrentUser = function () {
        return currentUser;
    };

});
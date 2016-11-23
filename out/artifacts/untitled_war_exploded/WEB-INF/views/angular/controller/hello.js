app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "/res/pages/login.html"
        })
        .when("/register", {
            templateUrl: "/res/pages/register.html"
        })
        .when("/dashboard", {
            templateUrl: "/res/pages/dashboard.html"
        })
        .when("/weather", {
            templateUrl: "/res/pages/weather.html"
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller('registerCtrl', function ($scope, $http, $location) {
    $scope.submit = function () {
        var user = {};
        user.email = $scope.email;
        user.password = $scope.password;
        user.firstname = $scope.firstname;
        user.lastname = $scope.lastname;
        console.log(user);
        $http.post('http://localhost:8080/user/register', user).then(function (response) {
                if (response.data) {
                    $location.path("/login");
                }
                ;
            }
        );
    }

});

app.controller('loginCtrl', function (SessionService, $scope, $http, $location) {
    $scope.submit = function () {
        var user = {};
        user.id = null;
        user.email = $scope.email;
        user.password = $scope.password;
        user.firstname = null;
        user.lastname = null;
        $http.post('http://localhost:8080/user/login', user).then(function (response) {
                if (response.data != null && response.data != "") {
                    SessionService.setUserAuthenticated(true);
                    SessionService.setCurrentUser(response.data);
                    console.log(SessionService.getCurrentUser());
                    $location.path("/dashboard");
                } else {
                    $scope.message = "Incorrect email or password!";
                }
                ;
            }
        );
    }
});


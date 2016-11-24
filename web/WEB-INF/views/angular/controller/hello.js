app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "/res/pages/login.html"
        })
        .when("/register", {
            templateUrl: "/res/pages/register.html"
        })
        .when("/dashboard", {
            resolve: {
                "check": function ($location, SessionService) {
                    if (!SessionService.getUserAuthenticated()) {
                        $location.path("/");
                    }
                }
            },
            templateUrl: "/res/pages/dashboard.html"
        })
        .when("/weather", {
            templateUrl: "/res/pages/weather.html"
        })
        .when("/", {
            templateUrl: "/res/pages/login.html"
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
    $scope.loggedUser = SessionService.getCurrentUser();
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

                    $location.path("/dashboard");
                } else {
                    $scope.message = "Incorrect email or password!";
                }
                ;
            },
            function (err) {
                console.log(err);
            }
        );
    };
    $scope.delete = function (id) {
        for (var i = 0; i < SessionService.getCurrentUser().cityList.length; i++) {
            if (SessionService.getCurrentUser().cityList[i].id == id) {
                break;
            }
        }
        console.log(i);
        $http.delete('http://localhost:8080/city/delete/' + id);
        SessionService.getCurrentUser().cityList.splice(i, 1);
    };
});

app.controller('addCityCtrl', function (SessionService, $scope, $http) {
    var city = {};
    $scope.submitCity = function () {
        city.name = $scope.city;
        $http.post('http://localhost:8080/city/create/' + SessionService.getCurrentUser().id, city).then(function (response) {
                console.log(SessionService.getCurrentUser().cityList);
                console.log($scope.city);
                SessionService.getCurrentUser().cityList.push({'id': response.data.id, 'name': $scope.city});
                $scope.city = '';
                ;
            },
            function (err) {
                console.log(err);
            }
        );
    };
});


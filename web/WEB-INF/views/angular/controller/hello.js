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
        .when("/byCity", {
            templateUrl: "/res/pages/byCity.html"
        })
        .when("/", {
            templateUrl: "/res/pages/login.html"
        });
    // .otherwise({
    //     redirectTo: "/"
    // });
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

app.controller('loginCtrl', function (SessionService, $scope, $http, $location, $rootScope) {
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
    $scope.showWeather = function (city) {
        $http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?q=' + city +
            '&key=d955d43298874365b29132322162511&format=json&num_of_days=3&tp=24').then(function (response) {
            // hide map elements
            var myEl = angular.element(document.querySelector('#map'));
            myEl.attr('ng-show', "false");
            myEl.attr('class', "ng-scope ng-hide");
            // show fav elements
            var myEl = angular.element(document.querySelector('#fav'));
            myEl.attr('ng-show', "true");
            myEl.attr('class', "ng-scope ng-show");

            //parsing weekday
            var weekday = new Array(7);
            var d;
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";



            //adding data
            $rootScope.current_condition = response.data.data.current_condition[0];
            $rootScope.request = response.data.data.request[0]
            $rootScope.day1 = response.data.data.weather[0];
            $rootScope.day2 = response.data.data.weather[1];
            $rootScope.day3 = response.data.data.weather[2];
            $rootScope.dayName1=weekday[new Date($rootScope.day1.date).getDay()];
            $rootScope.dayName2=weekday[new Date($rootScope.day2.date).getDay()];
            $rootScope.dayName3=weekday[new Date($rootScope.day3.date).getDay()];
        })
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
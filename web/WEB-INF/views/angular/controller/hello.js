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
        $http.post('http://localhost:8080/user/register', user).then(function (response) {
                if (response.data) {
                    $location.path("/login");
                } else {
                    $scope.message = "Email already exists!";
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
        //parsing weekday
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var cityCache = {};
        cityCache.name = city;
        $http.post('http://localhost:8080/cache/getByName', cityCache).then(function (response) {
            var hours;
            var currentDay;
            var saveDay;
            if (response.data != null && response.data != "") {
                var saveDate = new Date(response.data[0].saveDate);
                var currentDate = new Date();
                currentDay = weekday[new Date(currentDate).getDay()];
                saveDay = weekday[new Date(saveDate).getDay()];
                hours = Math.abs(currentDate - saveDate) / 36e5;
            }
            if (response.data != null && response.data != "" && hours < 3 && currentDay == saveDay) {
                console.log(cityCache.name + "-loaded from cache!");
                // hide map elements
                var myEl = angular.element(document.querySelector('#map'));
                myEl.attr('ng-show', "false");
                myEl.attr('class', "ng-scope ng-hide");
                var mainMessage = angular.element(document.querySelector('#mainMessage'));
                mainMessage.attr('ng-show', "false");
                mainMessage.attr('class', "ng-scope ng-hide");
                // show fav elements
                var myEl = angular.element(document.querySelector('#fav'));
                myEl.attr('ng-show', "true");
                myEl.attr('class', "ng-scope ng-show");

                //rotScope for day1
                $rootScope.dayName1 = response.data[0].dayName.split("|")[0];
                $rootScope.current_condition = {
                    humidity: response.data[0].humidity.split("|")[0],
                    windspeedKmph: response.data[0].windSpeed.split("|")[0],
                    temp_C: response.data[0].temp.split("|")[0],
                    FeelsLikeC: response.data[0].feels.split("|")[0],
                    precipMM: response.data[0].rainfall.split("|")[0],
                    weatherIconUrl: [{
                        value: response.data[0].icon.split("|")[0]
                    }],
                    weatherDesc: [{
                        value: response.data[0].description.split("|")[0]
                    }]
                };
                $rootScope.day1 = {
                    date: response.data[0].date.split("|")[0],
                    maxtempC: response.data[0].max.split("|")[0],
                    mintempC: response.data[0].min.split("|")[0],
                    astronomy: [{
                        moonrise: response.data[0].moonrise.split("|")[0],
                        moonset: response.data[0].moonset.split("|")[0],
                        sunrise: response.data[0].sunrise.split("|")[0],
                        sunset: response.data[0].sunset.split("|")[0]
                    }],
                    hourly: [{
                        windspeedKmph: response.data[0].windSpeed.split("|")[0]
                    }]
                }

                $rootScope.request = {
                    query: response.data[0].name.split("|")[0]
                }

                //rootscope for day 2 and day 3
                $rootScope.day2 = {
                    date: response.data[0].date.split("|")[1],
                    maxtempC: response.data[0].max.split("|")[1],
                    mintempC: response.data[0].min.split("|")[1],
                    hourly: [{
                        FeelsLikeC: response.data[0].feels.split("|")[1],
                        humidity: response.data[0].humidity.split("|")[1],
                        precipMM: response.data[0].rainfall.split("|")[1],
                        tempC: response.data[0].temp.split("|")[1],
                        windspeedKmph: response.data[0].windSpeed.split("|")[1],
                        weatherIconUrl: [{
                            value: response.data[0].icon.split("|")[1]
                        }],
                        weatherDesc: [{
                            value: response.data[0].description.split("|")[1]
                        }]
                    }],
                    astronomy: [{
                        moonrise: response.data[0].moonrise.split("|")[1],
                        moonset: response.data[0].moonset.split("|")[1],
                        sunrise: response.data[0].sunrise.split("|")[1],
                        sunset: response.data[0].sunset.split("|")[1],
                    }]
                }
                $rootScope.dayName2 = response.data[0].dayName.split("|")[1];

                //rootscope for day 2 and day 3
                $rootScope.day3 = {
                    date: response.data[0].date.split("|")[2],
                    maxtempC: response.data[0].max.split("|")[2],
                    mintempC: response.data[0].min.split("|")[2],
                    hourly: [{
                        FeelsLikeC: response.data[0].feels.split("|")[2],
                        humidity: response.data[0].humidity.split("|")[2],
                        precipMM: response.data[0].rainfall.split("|")[2],
                        tempC: response.data[0].temp.split("|")[2],
                        windspeedKmph: response.data[0].windSpeed.split("|")[2],
                        weatherIconUrl: [{
                            value: response.data[0].icon.split("|")[2]
                        }],
                        weatherDesc: [{
                            value: response.data[0].description.split("|")[2]
                        }]
                    }],
                    astronomy: [{
                        moonrise: response.data[0].moonrise.split("|")[2],
                        moonset: response.data[0].moonset.split("|")[2],
                        sunrise: response.data[0].sunrise.split("|")[2],
                        sunset: response.data[0].sunset.split("|")[2],
                    }]
                }
                $rootScope.dayName3 = response.data[0].dayName.split("|")[2];


            } else {
                $http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?q=' + city +
                    '&key=d955d43298874365b29132322162511&format=json&num_of_days=3&tp=24').then(function (response) {
                    console.log(cityCache.name + "from api!");
                    // hide map elements
                    var myEl = angular.element(document.querySelector('#map'));
                    myEl.attr('ng-show', "false");
                    myEl.attr('class', "ng-scope ng-hide");
                    var mainMessage = angular.element(document.querySelector('#mainMessage'));
                    mainMessage.attr('ng-show', "false");
                    mainMessage.attr('class', "ng-scope ng-hide");
                    // show fav elements
                    var myEl = angular.element(document.querySelector('#fav'));
                    myEl.attr('ng-show', "true");
                    myEl.attr('class', "ng-scope ng-show");

                    //adding data
                    $rootScope.current_condition = response.data.data.current_condition[0];
                    var current_condition = $rootScope.current_condition;
                    $rootScope.request = response.data.data.request[0]
                    var request = $rootScope.request;
                    $rootScope.day1 = response.data.data.weather[0];
                    var day1 = $rootScope.day1;
                    $rootScope.day2 = response.data.data.weather[1];
                    var day2 = $rootScope.day2;
                    $rootScope.day3 = response.data.data.weather[2];
                    var day3 = $rootScope.day3;
                    $rootScope.dayName1 = weekday[new Date($rootScope.day1.date).getDay()];
                    $rootScope.dayName2 = weekday[new Date($rootScope.day2.date).getDay()];
                    $rootScope.dayName3 = weekday[new Date($rootScope.day3.date).getDay()];

                    //Setting variables for caching!
                    cityCache.date = day1.date + "|" + day2.date + "|" + day3.date;
                    cityCache.dayName = weekday[new Date(day1.date).getDay()] + "|" + weekday[new Date(day2.date).getDay()] + "|" + weekday[new Date(day3.date).getDay()]
                    cityCache.feels = current_condition.FeelsLikeC + "|" + day2.hourly[0].FeelsLikeC + "|" + day3.hourly[0].FeelsLikeC;
                    cityCache.humidity = current_condition.humidity + "|" + day2.hourly[0].humidity + "|" + day3.hourly[0].humidity;
                    cityCache.icon = current_condition.weatherIconUrl[0].value + "|" + day2.hourly[0].weatherIconUrl[0].value + "|" + day3.hourly[0].weatherIconUrl[0].value;
                    cityCache.max = day1.maxtempC + "|" + day2.maxtempC + "|" + day3.maxtempC;
                    cityCache.min = day1.mintempC + "|" + day2.mintempC + "|" + day3.mintempC;
                    cityCache.moonrise = day1.astronomy[0].moonrise + "|" + day2.astronomy[0].moonrise + "|" + day3.astronomy[0].moonrise;
                    cityCache.moonset = day1.astronomy[0].moonset + "|" + day2.astronomy[0].moonset + "|" + day3.astronomy[0].moonset;
                    cityCache.name = request.query;
                    cityCache.rainfall = current_condition.precipMM + "|" + day2.hourly[0].precipMM + "|" + day3.hourly[0].precipMM;
                    cityCache.saveDate = new Date();
                    cityCache.sunrise = day1.astronomy[0].sunrise + "|" + day2.astronomy[0].sunrise + "|" + day3.astronomy[0].sunrise;
                    cityCache.sunset = day1.astronomy[0].sunset + "|" + day2.astronomy[0].sunset + "|" + day3.astronomy[0].sunset;
                    cityCache.temp = current_condition.temp_C + "|" + day2.hourly[0].tempC + "|" + day3.hourly[0].tempC;
                    cityCache.windSpeed = current_condition.windspeedKmph + "|" + day2.hourly[0].windspeedKmph + "|" + day3.hourly[0].windspeedKmph;
                    cityCache.description = current_condition.weatherDesc[0].value + "|" + day2.hourly[0].weatherDesc[0].value + "|" + day3.hourly[0].weatherDesc[0].value;

                    $http.post('http://localhost:8080/cache/save', cityCache).then(function (response) {

                    })

                })
            }
        })

    };
});

app.controller('addCityCtrl', function (SessionService, $scope, $http) {
    var city = {};
    $scope.submitCity = function () {
        city.name = $scope.city;
        $http.post('http://localhost:8080/city/create/' + SessionService.getCurrentUser().id, city).then(function (response) {
                console.log(SessionService.getCurrentUser().cityList);
                SessionService.getCurrentUser().cityList.push({'id': response.data.id, 'name': $scope.city});
                $scope.city = '';
                ;
            },
            function (err) {
                console.log(err);
            }
        );
    };
    $scope.initAutocomplete = function () {
        var autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('city')),
            {
                types: ['(cities)'],
            });
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
          //  console.log(place.formatted_address);
            $scope.city = place.formatted_address;
        });
    };
});
app.controller('logoutCtrl', function ($scope, SessionService, $location) {
    $scope.logout = function () {
        SessionService.setUserAuthenticated(false);
        $location.path("/login");
    };
});
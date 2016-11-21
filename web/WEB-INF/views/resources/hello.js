app.controller('Hello', function ($scope, $http) {
    $http.get('/user/?username=JohnDoe&password=sdfsdfd').then(function (response) {
       // console.log(response);
        $scope.user = response.data;
    });
});
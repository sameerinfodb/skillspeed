
app.controller('registrationController', ['$scope', '$location', 'RegService', function ($scope, $location, regService) {
    var self = this;
    self.user = regService.newUser;
    $scope.emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $scope.phoneNoRegEx = /^[0-9]\d{2,4}-\d{6,8}$/;
    self.redirectTo = function (url) {
        $location.url(url);
    }
    function clearFields() {
        self.user = "";
        self.user.firstName = "";
        self.user.lastName = "";
        self.user.emailID = "";
        self.user.phoneNumber = "";
        self.user.password = "";
        self.user.confirmPassword = "";
    }

    self.submit = function () {
        regService.addUser(self.user);
        clearFields();
        $location.url('/Confirmation');
    }
}]);
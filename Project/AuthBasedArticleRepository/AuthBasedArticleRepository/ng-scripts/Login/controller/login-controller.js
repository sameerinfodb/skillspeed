

app.controller("loginController", ['$rootScope', '$scope', '$location', 'RegService', 'AuthService', function ($rootScope, $scope, $location, regService, authService) {
    var self = this;
    $scope.emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //$scope.phoneNoRegEx = /^[0-9]\d{2,4}-\d{6,8}$/;
    clearFields();
    self.submit = function () {
        //var index = _.findIndex(regService.users, function (b) {

        //    var result = false;

        //    if (b.emailID !== null && self.user.emailID !== null) {
        //        result = (b.emailID === self.user.emailID);
        //    }
        //    else if (b.phoneNo !== null && self.user.phoneNo !== null) {
        //        result = (b.phoneNo === self.user.phoneNo);
        //    }
        //    result = result && b.password === self.user.password;
        //    return result;
        //});


        if (!authService.$getAuth()) {
            authService.$signInWithEmailAndPassword(self.user.emailID, self.user.password).then(function (user) {
                $rootScope.loginStatus = user;
               // $rootScope.$broadcast("UserLoggedIn", user);
                $location.url("/articles");
            }).catch(function (error) { alert("Authentication failed:" + error); });
            
          

        }
        else {
            // authService.setLoginStatus(false);
            if (authService.$getAuth())
            {
                authService.$signOut();
            }
            alert("User does not exists!!!");
        }
    };

    self.redirectTo = function (url) {
        $location.url(url);
    };
    function clearFields() {
        self.user = "";
        self.user.emailID = "";
        //self.user.password = "";

    }

}]);
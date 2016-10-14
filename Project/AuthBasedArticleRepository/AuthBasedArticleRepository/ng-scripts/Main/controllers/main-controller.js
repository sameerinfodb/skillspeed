app.controller("MainController", ['$rootScope', '$scope', '$location', 'AuthService', function ($rootScope, $scope, $location, authService) {

    var self = this;
    authService.$onAuthStateChanged(function (user) {
        $rootScope.loginStatus = authService.$getAuth();
        if (!$rootScope.loginStatus)
        {
             $location.url("/Login");
        }
        else
        {
            $location.url("/articles");
        }

    });
    self.logOut = function () {    
        authService.$signOut();
    }

    //$rootScope.$on("UserLoggedIn", function () {
    //    $rootScope.loginStatus = authService.$getAuth();
    //});

}]);

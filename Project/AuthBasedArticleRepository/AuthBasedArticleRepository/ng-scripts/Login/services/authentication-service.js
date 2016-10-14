// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("AuthService", ["$firebaseAuth",
  function ($firebaseAuth) {
      var self = this;

       return $firebaseAuth();
  }
]);
//app.factory('authService', ["$firebaseAuth", function ($firebaseAuth) {

//    var authenticationService = {};

//    authenticationService.currentUser = null;
//    authenticationService.loginStatus = null;

//    authenticationService.isLoggedIn = function (status) {

//        return authenticationService.loginStatus;
//    }
//    authenticationService.setLoginStatus = function (status) {
//        authenticationService.loginStatus = status;
//    }
//    authenticationService.setUserProfile = function (user) {
//        authenticationService.currentUser = user;
//    }
//    return authenticationService;
//}]);

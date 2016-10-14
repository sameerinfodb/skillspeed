
app.controller('confirmationController', ['$scope', '$location', 'RegService','Profile','AuthService', function ($scope, $location, regService,profile,authService) {
    var self = this;
    self.user = regService.newUser;
    self.redirectTo = function (url) {
        $location.url(url);
    }
    self.saveUser = function () {
        regService.saveUser(regService.newUser)
         .then(function (user) {
             var userProfile = profile(user.uid);
             userProfile.$add(regService.newUser)
                 .then(function () {
                   //  regService.newUser = user;
                     authService.$signOut();
                     $location.url('/Login');
                 })
                 .catch(function (error) {
                     //TODO:we need to cancell the creation of use as well.
                     alert('Saving of Profile Failed' + error);
                 });
               })
                .catch(function (error) {
                    alert("Registeration Failed:" + error);
                    $location.url('/Register');
                });
       
    }

}]);
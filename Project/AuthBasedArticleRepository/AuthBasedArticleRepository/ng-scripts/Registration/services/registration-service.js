    
app.factory('RegService', ["AuthService",function (authService) {

    var registerService = {};

    registerService.users = [];
    registerService.newUser = "";

    registerService.addUser = function (user) {

        registerService.newUser = user;
    }
    registerService.saveUser = function (user) {

        return authService.$createUserWithEmailAndPassword(user.emailID, user.password);
               
    }
   
    return registerService;
}]);
var app = angular.module("ArticleRepoApp", ['firebase', 'ngMessages', 'ngRoute','ngDialog','ngSanitize', 'ui.tinymce']);


app.config(function () {
    
    // Initialize Firebase

    //var config = {
    //    apiKey: "%API-KEY%",
    //    authDomain: "%AUTH-DOMAIN%",
    //    databaseURL: "%DATABASE-URL%",
    //    storageBucket: "%STORAGE-BUCKET%",
    //    messagingSenderId: "%MESSAGING-SENDER-ID%"
    //};

    var config = {
        apiKey: "AIzaSyDWf0_Pjk6ktFHRmhSxocZalnhxBYyw-S4",
        authDomain: "authbasedarticlerepository.firebaseapp.com",
        databaseURL: "https://authbasedarticlerepository.firebaseio.com",
        storageBucket: "authbasedarticlerepository.appspot.com",
        messagingSenderId: "286100260060"
    };
    firebase.initializeApp(config);
});

//Configuring the provider before they're actually created.
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
	.when('/', {
	    redirectTo: '/Login'
	})
	.when('/Login', {
	    templateUrl: 'ng-views/LoginForm.html',
	    controller: 'loginController',
	    controllerAs: 'ctrl'
	})
	.when('/Register', {
	    templateUrl: 'ng-views/RegisterForm.html',
	    controller: 'registrationController',
	    controllerAs: 'ctrl'
	})
	.when('/Confirmation', {
	    templateUrl: 'ng-views/ConfirmationForm.html',
	    controller: 'confirmationController',
	    controllerAs: 'ctrl'
	})
	.when('/articles', {
	    templateUrl: 'ng-views/Article/ArticleListing.html',
	    controller: 'ArticleController',
	    controllerAs: 'ctrl'

	})
    .when('/articles/create', {
        templateUrl: 'ng-views/Article/CreateArticle.html',
        controller: 'CreateArticleController',
        controllerAs: 'ctrl'

    })
	.otherwise({
	    redirectTo: '/Login'

	});
}]);

app.run(function ($rootScope, $location, AuthService) {

    // enumerate routes that don't need authentication
    var routesThatDontRequireAuth = ['/Login', '/Register', '/Confirmation'];

    // check if current location matches route  
    var routeClean = function (route) {
        var flag = _.find(routesThatDontRequireAuth, function (eachRoute) {
           return _.startsWith(route, eachRoute);
        });
        if (flag === undefined) {
            return false;
        }
        else {
            return true;
        }


    };

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // if route requires auth and user is not logged in
        if (!routeClean($location.url()) && !AuthService.$getAuth()) {
            // redirect back to login
            $location.path('/Login');
        }
    });
});



var app = angular.module("todoapp", ['ngMessages','ngRoute']);
app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{
			redirectTo:'/Login'			
		})
	.when('/Login',{
			templateUrl:'LoginForm.html',
			controller: 'loginController',
			controllerAs:'ctrl'		
	})
	.when('/Register',{
			templateUrl:'RegisterForm.html',
			controller: 'registrationController',
			controllerAs:'ctrl'		
	})
	.when('/Confirmation',{
			templateUrl:'ConfirmationForm.html',
			controller: 'confirmationController',
			controllerAs:'ctrl'		
	})
	.when('/TodoApp',{
			templateUrl:'TodoApp.html',
			controller: 'todoController',
			controllerAs:'ctrl'		
	})
	.otherwise({
		redirectTo:'/Login'
		
	});	
}]);
app.factory('regService',function(){
	
	var registerService={};
	
	registerService.users=[];
	registerService.newUser="";
	
	registerService.addUser=function (user)
	{
		registerService.newUser=user;
	}
	registerService.saveUser=function(user)
	{
		registerService.users.push(user);	
		registerService.newUser=null;
	}
	return registerService;
});

app.factory('authService',function(){
	
	var authenticationService={};
	
	authenticationService.currentUser=null;
	authenticationService.loginStatus=null;
	
	authenticationService.setLoginStatus=function(status)
	{
		authenticationService.loginStatus=status;
	}
	authenticationService.setUserProfile=function(user)
	{
		authenticationService.currentUser=user;
	}
	return authenticationService;
});



app.controller("mainController",['$rootScope','$scope','$location','authService',function($rootScope,$scope,$location,authService){
	
	var self=this;
	self.logOut=function ()
	{
		authService.setLoginStatus(false);
		$rootScope.loginStatus=authService.loginStatus;
		$location.url("\'");
	}
	
	$rootScope.$on("UserLoggedIn", function() {
               $rootScope.loginStatus=authService.loginStatus;
            });

}]);
app.controller("todoController", ['$scope','$location','regService',function ($scope,$location,regService) {
    var taskList = [];
    var self = this;

    self.addTask = function (task) {

        taskList.push(task);
    };


    self.Tasks = taskList;

}]);

app.controller("loginController",['$rootScope','$scope','$location','regService','authService',function ($rootScope,$scope,$location,regService,authService){
	var self=this;
	$scope.emailRegEx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	$scope.phoneNoRegEx=/^[0-9]\d{2,4}-\d{6,8}$/;
	clearFields();
	self.submit=function()
	{		
		var index=_.findIndex(regService.users,function(b){
			
				var result=false;
				
				if(b.emailID!==null && self.user.emailID!==null)
				{
					result = (b.emailID===self.user.emailID );
				}
				else if(b.phoneNo!==null && self.user.phoneNo!==null)
				{
					result =( b.phoneNo===self.user.phoneNo);
				}
				result=result && b.password===self.user.password;
				return result;
			});
			
		if(index!== -1)
		{
				authService.setLoginStatus(true);
				$rootScope.$broadcast("UserLoggedIn");
				$location.url("/TodoApp");
				
		}
		else
		{
			authService.setLoginStatus(false);
			alert("User does not exists!!!");
		}
	}	
	
	self.redirectTo=function(url)
	{
		$location.url(url);
	}
	function clearFields()
	{
		self.user="";
		self.user.emailID="";
		self.user.password="";
		
	}
	
}]);

app.controller('registrationController',['$scope','$location','regService',function ($scope,$location,regService)
{
	var self=this;
	self.user=regService.newUser;
	$scope.emailRegEx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	$scope.phoneNoRegEx=/^[0-9]\d{2,4}-\d{6,8}$/;
	self.redirectTo=function(url)
	{
		$location.url(url);
	}
	function clearFields()
	{
		self.user="";
		self.user.firstName="";
		self.user.lastName="";
		self.user.emailID="";
		self.user.phoneNumber="";
		self.user.password="";
		self.user.confirmPassword="";	
	}
	
	self.submit=function()
	{
		regService.addUser(self.user);
		clearFields();
		$location.url('/Confirmation');
	}
}]);
app.controller('confirmationController',['$scope','$location','regService',function ($scope,$location,regService)
{
	var self=this;
	self.user=regService.newUser;
	self.redirectTo=function(url)
	{
		$location.url(url);
	}
	self.saveUser=function()
	{
		regService.saveUser(regService.newUser);	
		$location.url('/Login');
	}
	
}]);
var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
				
                return modelValue === scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
			
                ngModel.$validate();
            });
        }
    };
};
app.directive("compareTo",compareTo);
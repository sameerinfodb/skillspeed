(function () {
    'use strict';

    angular
        .module('ArticleRepoApp')
        .controller('ArticleController', controller);

    controller.$inject = ['$rootScope','$scope','$sce','ngDialog','$location','ArticlePersistenceService']; 

    function controller($rootScope, $scope, $sce,ngDialog,$location, ArticlePersistenceService) {
        var ctrl = this;
        var user = $rootScope.loginStatus;
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.title = 'Articles';
        if (user) {
            var articlesList = ArticlePersistenceService(user.uid);
          
            articlesList.$loaded(
                  function (x) {
                      $scope.articles=articlesList; // true
                  }, function (error) {
                      console.error("Error:", error);
                  });
        }
        ctrl.redirectTo = function (url) {
            $location.url(url);
        }
        ctrl.edit = function (article) {
            $location.url("/articles");
            ngDialog.open({
                template: 'ng-views/Article/UpdateArticle.html',
                className: 'ngdialog-theme-default',
                data:article,
                controller: 'EditArticleController',
                controllerAs:'ctrl'
            });

            ctrl.redirectTo = function (url) {
                $location.url(url);
            }
           
        };

        ctrl.delete = function (article) {
           
            ngDialog.openConfirm({
                template: 'ng-views/ConfirmationDialog.html',
                className: 'ngdialog-theme-default'
            }).then(function () {
                var list = $scope.articles;
                var rec = list.$getRecord(article.$id);
                list.$remove(rec).then(function (ref) {
                    alert('Article deleted successfully.');
                    $location.url("/articles");
                });             

            }, function () {
                $location.url("/articles");
            });


        };
        
    }
})();

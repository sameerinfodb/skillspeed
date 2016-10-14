(function () {
    'use strict';

    angular
        .module('ArticleRepoApp')
        .controller('EditArticleController', edit_article_controller);

    edit_article_controller.$inject = ['$rootScope', '$scope', '$sce', 'ngDialog', 'ArticlePersistenceService', '$location'];

    function edit_article_controller($rootScope, $scope, $sce, ngDialog, ArticlePersistenceService, $location) {
        var ctrl = this;

        $scope.tinymceOptions = {
            plugins: 'link image code',
            height: "300px",
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            menubar: false
        };
        /* jshint validthis:true */
        ctrl.article = $scope.ngDialogData;
        ctrl.redirectTo = function (url) {
            $location.url(url);
            $scope.closeThisDialog();          
        }
        ctrl.submit = function () {
            var user = $rootScope.loginStatus;
            if (user) {
                var articlesList = ArticlePersistenceService(user.uid);

                articlesList.$loaded(
                      function (list) {
                          $scope.articles = list; // true               
                          var rec = list.$getRecord(ctrl.article.$id);
                          rec.title = ctrl.article.title;
                          rec.content = ctrl.article.content;
                          list.$save(rec)
                               .then(function () {
                                   alert('Article update successfully');
                                   $location.url('/articles');
                                   $scope.closeThisDialog();
                               })
                               .catch(function (error) {
                                   alert('Saving of article Failed' + error);
                               });

                      }, function (error) {
                          console.error("Error:", error);
                      });



            }
        }

    }
})();

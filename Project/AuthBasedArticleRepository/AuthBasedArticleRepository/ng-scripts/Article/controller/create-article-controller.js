(function () {
    'use strict';

    angular
        .module('ArticleRepoApp')
        .controller('CreateArticleController', create_article_controller);

    create_article_controller.$inject = ['$rootScope', '$scope', '$location', '$sce', 'ArticlePersistenceService'];

    function create_article_controller($rootScope,$scope,$location, $sce, ArticlePersistenceService) {
        var ctrl = this;
        $scope.title = 'create_article_controller';
        $scope.tinymceOptions = {
            plugins: 'link image code',
            height: "300px",
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            //        init_instance_callback: function(editor) {
            //            var textContentTrigger = function() {
            //                $scope.textContent = editor.getBody().textContent;
            //                $scope.htmlContent = $sce.trustAsHtml(editor.getBody().innerHTML);
            //                $scope.$apply();
            //            };  

            //    editor.on('KeyUp', textContentTrigger);
            //    editor.on('ExecCommand', textContentTrigger);
            //    editor.on('SetContent', function(e) {
            //        if(!e.initial)
            //            textContentTrigger();
            //    });
            //},
            menubar: false
        };
        ctrl.redirectTo = function (url) {
            $location.url(url);
        }
        ctrl.submit=function ()
        {
            var user=$rootScope.loginStatus;
            if(user)
            {
                var articlePersistenceServer = ArticlePersistenceService(user.uid);

                articlePersistenceServer.$add({title:ctrl.article.title,content:ctrl.article.content,createDate:new Date()})
                                         .then(function () {
                                             alert('Article added successfully');
                                             $location.url('/articles');
                                         })
                 .catch(function (error) {
                      alert('Saving of article Failed' + error);
                 });

            }
        }
    }
})();

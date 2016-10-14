(function () {
    'use strict';

    angular
        .module('app')
        .factory('articleService', articleService);

    article_service.$inject = ['$firebaseArray'];

    function article_service($firebaseArray) {
        var service = {
            getArticles: getArticles,
            createArticle: createArticle,
            saveArticle: saveArticle,
            deleteArticle:deleteArticle
        };

        return service;

        function getArticles() {


        }

        function createArticle(article,uid) {

        }

        function saveArticle() { }

        function deleteArticle() { }

    }
})();
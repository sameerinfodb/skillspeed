(function() {
    'use strict';
    var app, stripHtmlTags;

    app = angular.module('ArticleRepoApp');

    stripHtmlTags = function (v) {
        return String(v).replace(/<[^>]+>/gm, '');
    };

    app.directive('plainTextMaxLength', function ($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                var maxLength, validPlainTextLength;
                validPlainTextLength = function (v) {
                    if (!v) {
                        return true;
                    }
                    return stripHtmlTags(v).length <= maxLength;
                };
                maxLength = 0;
                scope.$watch(attributes.plainTextMaxLength, function (newValue, oldValue) {
                    if (maxLength !== newValue) {
                        maxLength = newValue;
                        return ngModel.$validate();
                    }
                });
                return ngModel.$validators['plainTextMaxLength'] = function (modelValue, viewValue) {
                    if (viewValue.$$unwrapTrustedValue) {
                        return validPlainTextLength(viewValue.$$unwrapTrustedValue());
                    } else {
                        return validPlainTextLength(viewValue);
                    }
                };
            }
        };
    });

})();
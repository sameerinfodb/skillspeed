var app = angular.module("filterApp", []);
app.controller("MainController", ["$scope", "$http", function ($scope, $http) {
    $scope.products = null;
    var productType = null;
    var products = [];
    $http.get('scripts/app/data.json').then(function (result) {

        productType = result.data;
     
        $scope.products = productType;
    });
    
}]);
//filter 1: By PropType
app.filter("filterByPropType", function () {
    var filterByPropTypeFilter = function (input, option) {
        var result = "";
        for (var property in input) {
            if (input.hasOwnProperty(property)) {
                if (option["type"] !== undefined && option["type"]!=="") {
                    if (input[property] === option["type"]) {
                        result = result + input.name;
                        result = result + ", ";
                    }
                }
                else
                {
                    result =  input.name;
                    result = result + ", ";
                }
            }
        }
        return result;
    };
   return filterByPropTypeFilter;
});

//filter 2: By Description
app.filter("filterByPropDescription", function () {
    var filterByDescTypeFilter = function (input, option) {
        var result = "";
        
        if (input.hasOwnProperty("description")) {
                if (option["description"] !== undefined && option["description"] !== "") {
                    if (input.description === option["description"]) {
                        result = result + input.name;
                        result = result + ", ";
                    }
                }
                else {
                    result = input.name;
                    result = result + ", ";
                }
            }
   
        return result;
    };
    return filterByDescTypeFilter;
});
//filter 3: filter only required Fields/prop
app.filter("filterByReq", function () {
    var filterByReqFilter = function (input, option) {
        var result = "";

        if (input.hasOwnProperty("required")) {
            if (option["required"] !== undefined && option["required"] !== "") {
                if (input.required.toString() === option["required"]) {
                    result = result + input.name;
                    result = result + ", ";
                }
            }
            else {
                result = input.name;
                result = result + ", ";
            }
        }

        return result;
    };
    return filterByReqFilter;
});


//filter 4: filter by Field Name
app.filter("filterByName", function () {
    var filterByNameFilter = function (input, option) {
        var result = "";

        if (input.hasOwnProperty("name")) {
            if (option["name"] !== undefined && option["name"] !== "") {
                if (input.required.toString() === option["name"]) {
                    result = result + input.name;
                    result = result + ", ";
                }
            }
            else {
                result = input.name;
                result = result + ", ";
            }
        }

        return result;
    };
    return filterByNameFilter;
});
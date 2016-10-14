

app.controller("todoController", ['$scope', '$location', function ($scope, $location) {
    var taskList = [];
    var self = this;

    self.addTask = function (task) {

        taskList.push(task);
    };


    self.Tasks = taskList;

}]);
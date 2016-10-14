var app = angular.module("todoapp", []);
app.controller("todoController", function myfunction() {
    var taskList = [];
    var self = this;

    self.addTask = function (task) {

        taskList.push(task);
    };


    self.Tasks = taskList;

});
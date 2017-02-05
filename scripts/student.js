"use strict";
angular.module("myapp",['ui.router','ui.bootstrap']);
angular.module("myapp").config(['$locationProvider','$stateProvider','$urlRouterProvider',function($locationProvider, $stateProvider, $urlRouterProvider){

    $stateProvider.state("studentForm",{
        url:"/studentForm",
        templateUrl:"/views/studentForm.html"
        
    }).state("classForm",{
        url:"/classForm",
        templateUrl:"/views/classForm.html"

    }).state("teacherForm",{
        url:"/teacherForm",
        templateUrl:"/views/teacherForm.html"
 
    }).state("batchForm",{
        url:"/batchForm",
        templateUrl:"/views/batchForm.html"
    
    }).state("sessionForm",{
        url:"/sessionForm",
        templateUrl:"/views/sessionForm.html"
    }).state("table",{
        url:"/table",
        templateUrl:"/views/table.html"
    });
}]);



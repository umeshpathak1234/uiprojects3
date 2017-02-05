angular.module("myapp").controller("sessionController",
["$scope","sessionHttp","teacherHttp","classHttp",function($scope,sessionHttp,teacherHttp,classHttp){
    
    $scope.sampleTest="checking123";
    $scope.sessionList=[];
    $scope.teacherList=[];
    refreshEntries();

    $scope.updateId = 0;
    $scope.formModels={
        startDate:"",
        endDate:"",
        classId:"",
        startTime:"",
        teacherId:"",
        sessionTitle:""
    };
    
    $scope.delete=function(sessionId){
       alert("delete"+sessionId);
      sessionHttp.deletesessionList(sessionId).then(function(response){
        refreshEntries();
      }
    )};
    
      $scope.update=function(sessionId){
       
       var promise=sessionHttp.getsessionListUniq(sessionId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateSessionlist=response;
            $scope.formModels=response[0];
            $scope.selectedTeacher = parseInt(response[0].teacherId);
            $scope.selectedClass = parseInt(response[0].classId);
        }); 
   }
$scope.add=function(){
    //alert($scope.formModels.sessionFirstname);
    var tempObj={
     sessionTitle:$scope.formModels.sessionTitle,
        startDate:$scope.formModels.startDate,
        endDate:$scope.formModels.endDate,
        startTime:$scope.formModels.startTime,
        classTitle:$scope.formModels.classTitle,
        teacherFirstname:$scope.formModels.teacherFirstname
        
        
    };
    
   console.log(tempObj); sessionHttp.postsessionList(tempObj).then(function(response){
        alert("sucessfully added");
        refreshEntries();
        resetForm();
    });
};
    
    function resetForm(){
        $scope.formModels={
            startDate:"",
            endDate:"",
            teacherId:"",
            classId:"",
            startTime:"",
            sessionTitle:""
        };
    }
    function refreshEntries(){ 
        var promise=sessionHttp.getSessionList();
        promise.then(function(response){
           console.log(response);
            $scope.sessionList=response;
        });
        
        var teacherpromise = teacherHttp.getteacherList();
        teacherpromise.then(function(response){
            console.log(response);
            $scope.teacherList = response;
        });
        var classpromise=classHttp.getclassList();
        classpromise.then(function(response){
            console.log(response);
            $scope.classList = response;
        });
    }
}]);
angular.module("myapp").controller("batchController",
["$scope","batchHttp","sessionHttp","personHttp",function($scope,batchHttp,sessionHttp,personHttp){
    
    $scope.sampleTest="checking123";
    $scope.batchList=[];
    $scope.sessionList=[];
    $scope.studentlist=[];
    refreshEntries();
    
    $scope.updateId = 0;
    $scope.formModels={
        sessionId:"",
        studentId:""
    };
    
    $scope.delete=function(batchId){
       alert("delete"+batchId);
      batchHttp.deletebatchList(batchId).then(function(response){
        refreshEntries();
      }
    )};

   $scope.update=function(batchId){
       
       var promise=batchHttp.getbatchListUniq(batchId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateBatchlist=response;
            $scope.formModels=response[0];
            $scope.selectedSession = response[0].sessionId;
            $scope.selectedStudent = response[0].studentId;
        }); 
   }
$scope.add=function(){
    //alert($scope.formModels.batchFirstname);
    var tempObj={

        sessionId:$scope.formModels.sessionId,
        studentId:$scope.formModels.studentId
        
    };
    
   console.log(tempObj); batchHttp.postbatchList(tempObj).then(function(response){
        alert("sucessfully added");
        refreshEntries();
        resetForm();
    });
};
    
    function resetForm(){
        $scope.formModels={
            batchId:"",
            studentId:"",
            classId:""
        };
    }
    function refreshEntries(){ 
        var promise=batchHttp.getbatchList();
        promise.then(function(response){
           console.log(response);
            $scope.batchList=response;
        });
        var sessionPromise = sessionHttp.getSessionList();
        sessionPromise.then(function(response){
            console.log(response);
            $scope.sessionList=response;
        });
        var personPromose = personHttp.getPersonList();
        personPromose.then(function(response){
            console.log(response);
            $scope.studentlist=response;
        });
    }
}]);
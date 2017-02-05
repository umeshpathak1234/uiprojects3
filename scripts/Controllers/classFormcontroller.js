angular.module("myapp").controller("classController",
["$scope","classHttp",function($scope,classHttp){
    
    $scope.sampleTest="checking123";
    $scope.classList=[];
    
    refreshEntries();

    $scope.updateId = 0;
    $scope.formModels={
        title:"",
        classLimit:"",
        description:""
    };
    
    $scope.delete=function(classId){
       alert("delete"+classId);
      classHttp.deleteclassList(classId).then(function(response){
        refreshEntries();
      }
    )};
    
    $scope.update=function(classId){
         var promise=classHttp.getclassListUniq(classId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateclasslist=response;
            $scope.formModels=response[0];
                }); 
        alert("update"+classId);
        $scope.updateId = classId;
    };
$scope.add=function(){
    //alert($scope.formModels.classFirstname);
    var tempObj={
     title:$scope.formModels.title,
        classLimit:$scope.formModels.classLimit,
        description:$scope.formModels.description
        
    };
    
   console.log(tempObj); classHttp.postclassList(tempObj).then(function(response){
        alert("sucessfully added");
        refreshEntries();
        resetForm();
    });
};
    
    function resetForm(){
        $scope.formModels={
            classId:"",
            title:"",
            classLimit:"",
            description:""
        };
    }
    function refreshEntries(){ 
        var promise=classHttp.getclassList();
        promise.then(function(response){
           console.log(response);
            $scope.classList=response;
        });
    }
}]);
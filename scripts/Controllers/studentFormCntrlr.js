angular.module("myapp").controller("studenttblCtrl",
["$scope","personHttp",function($scope,personHttp){
    
    $scope.sampleTest="checking123";
    $scope.studentlist=[];
    $scope.updateStudentlist=[];
    
    refreshEntries();
   
    $scope.updateId = 0;
    $scope.formModels={
        firstName:"",
        lastName:"",
        address:"",
        email:"",
        phoneNumber:"",
        ssn:""
    };
    //$scope.formModels.firstName="Hello World";
    $scope.delete=function(studentId){
       alert("delete"+studentId);
      personHttp.deletePersonList(studentId).then(function(response){
        refreshEntries();
      }
    )};
    
    $scope.update=function(studentId){
       
        
       var promise=personHttp.getPersonListUniq(studentId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateStudentlist=response;
            $scope.formModels=response[0];
            $scope.formModels.ssn=parseInt(response[0].ssn);
            $scope.formModels.phoneNumber=parseInt(response[0].phoneNumber);
        
        }); 
      
        
        alert("update"+studentId);
        $scope.updateId = studentId;
    };
    
    
 
$scope.add=function(){
    var tempObj={
        firstName:$scope.formModels.firstName,
        lastName:$scope.formModels.lastName,
        address:$scope.formModels.address,
        email:$scope.formModels.email,
        phoneNumber:$scope.formModels.phoneNumber,
        ssn:$scope.formModels.ssn
    };

    personHttp.postPersonList(tempObj).then(function(response){
        alert("sucessfully added");
        resetForm();
        refreshEntries();
        
    });
    
   
};
    
    function resetForm(){
        $scope.formModels={
            firstName:"",
            lastName:"",
            address:"",
            email:"",
            phoneNumber:"",
            ssn:""
        };
    }
    function refreshEntries(){  
        var promise=personHttp.getPersonList();
        promise.then(function(response){
            $scope.studentlist=response;
        });
    }
}]);



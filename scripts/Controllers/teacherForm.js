angular.module("myapp").controller("teachertblCtrl",
["$scope","teacherHttp",function($scope,teacherHttp){
    
    $scope.sampleTest="checking123";
    $scope.teacherList=[];
    
    refreshEntries();

    $scope.updateId = 0;
    $scope.formModels={
        teacherId:"",
        teacherFirstname:"",
        teacherLastname:"",
        teacherAddress:"",
        teacherEmail:"",
        teacherPhonenumber:""
    };
    
    $scope.delete=function(teacherId){
       alert("delete"+teacherId);
      teacherHttp.deleteteacherList(teacherId).then(function(response){
        refreshEntries();
      }
    )};
    
    $scope.update=function(teacherId){
         var promise=teacherHttp.getteacherListUniq(teacherId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateteacherlist=response;
            $scope.formModels=response[0];
            $scope.formModels.phoneNumber=parseInt(response[0].phoneNumber);
            $scope.selectedClass = response[0].classId;
            $scope.selectedTeacher = response[0].teacherId;
    
        }); 
        alert("update"+teacherId);
        $scope.updateId = teacherId;
    };
$scope.add=function(){
    var tempObj={
     firstName:$scope.formModels.teacherFirstname,
        lastName:$scope.formModels.teacherLastname,
        address:$scope.formModels.teacherAddress,
        email:$scope.formModels.teacherEmail,
        phoneNumber:$scope.formModels.teacherPhonenumber
        
    };
    
   console.log(tempObj); teacherHttp.postteacherList(tempObj).then(function(response){
        alert("sucessfully added");
        refreshEntries();
        resetForm();
    });
};
    
    function resetForm(){
        $scope.formModels={
            firstName:"",
            lastName:"",
            address:"",
            email:"",
            phoneNumber:""
        };
    }
    function refreshEntries(){ 
        var promise=teacherHttp.getteacherList();
        promise.then(function(response){
           console.log(response);
            $scope.teacherList=response;
        });
    }
}]);
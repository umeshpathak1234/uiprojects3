angular.module("myapp").service("personHttp",["$http",function($http){
    this.test="val from service";
    this.personList=[];
    var that=this;
    this.getPersonList=function(){
        return $http({
            method:"GET",
            url:"/service/studenttbl"
        }).then(function(result){
            console.log("yaha aayo hai ");
            that.personList=result.data;
            return result.data;
        });
    };
    this.getPersonListUniq=function(studentId){
        return $http({
            method:"GET",
            url:"/service/studenttbl/"+studentId
        }).then(function(result){
            that.personList=result.data;
            return result.data;
        });
    };
    
    
     this.postPersonList=function(dataParam){
        return $http({
            method:"POST",
            url:"/service/studenttbl", 
            data:dataParam
            
        }).then(function(result){
            //that.personList=result.data;
            return result.status;
        });
     }
     this.deletePersonList=function(studentId){
         return $http({
             method:"DELETE",
             url:"/service/studenttbl/"+studentId
         }).then(function(result){
             return result.status;
         })
     }
     this.updatePersonList=function(dataParam,studentId){
         console.log("Testing the update person list dataparams")
         console.log(dataParam);
         console.log(studentId);
         return $http({
             method:"PUT",
             url:"/service/studenttbl/"+studentId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);
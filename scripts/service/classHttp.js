angular.module("myapp").service("classHttp",["$http",function($http){
    this.test="val from service";
    this.classList=[];
    var that=this;
    this.getclassList=function(){
        return $http({
            method:"GET",
            url:"/service/classtbl"
        }).then(function(result){
            console.log("yaha  samma bhayoo ");
            that.classList=result.data;
            return result.data;
        });
    };
    
    this.getclassListUniq=function(classId){
        return $http({
            method:"GET",
            url:"/service/classtbl/"+classId
        }).then(function(result){
            that.classList=result.data;
            console.log(result.data);
            return result.data;
        });
    };
    
    
     this.postclassList=function(dataParam){
         alert("i am here");
        return $http({
            method:"POST",
            url:"/service/classtbl",
            data:dataParam
            
        }).then(function(result){
            //that.personList=result.data;
            return result.status;
        });
     }
     this.deleteclassList=function(classId){
         return $http({
             method:"DELETE",
             url:"/service/classtbl/"+classId
         }).then(function(result){
             return result.status;
         })
     }
     this.updateclassList=function(dataParam,classId){
         console.log("Testing the update person list dataparams")
         console.log(dataParam);
         console.log(classId);
         return $http({
             method:"PUT",
             url:"/service/classtbl/"+classId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);
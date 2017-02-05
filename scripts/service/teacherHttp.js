angular.module("myapp").service("teacherHttp",["$http",function($http){
    this.test="val from service";
    this.teacherList=[];
    var that=this;
    this.getteacherList=function(){
        return $http({
            method:"GET",
            url:"/service/teachertbl"
        }).then(function(result){
            console.log("yaha  samma bhayoo ");
            that.teacherList=result.data;
            return result.data;
        });
    };

    this.getteacherListUniq=function(teacherId){
        return $http({
            method:"GET",
            url:"/service/teachertbl/"+teacherId
        }).then(function(result){
            that.teacherList=result.data;
            console.log(result.data);
            return result.data;
        });
    };
    
    
     this.postteacherList=function(dataParam){
         alert("i am here");
        return $http({
            method:"POST",
            url:"/service/teachertbl",
            data:dataParam
            
        }).then(function(result){
            //that.personList=result.data;
            return result.status;
        });
     }
     this.deleteteacherList=function(teacherId){
         return $http({
             method:"DELETE",
             url:"/service/teachertbl/"+teacherId
         }).then(function(result){
             return result.status;
         })
     }
     this.updateteacherList=function(dataParam,teacherId){
         console.log("Testing the update person list dataparams")
         console.log(dataParam);
         console.log(teacherId);
         return $http({
             method:"PUT",
             url:"/service/teachertbl/"+teacherId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);
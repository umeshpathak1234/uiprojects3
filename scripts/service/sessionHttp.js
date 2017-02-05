angular.module("myapp").service("sessionHttp",["$http",function($http){
    this.test="val from service";
    this.sessionList=[];
    var that=this;
    this.getSessionList=function(){
        return $http({
            method:"GET",
            url:"/service/sessiontbl"
        }).then(function(result){
            console.log("yaha  samma bhayoo ");
            that.sessionList=result.data;
            return result.data;
        });
    };
    
    this.getsessionListUniq=function(sessionId){
        return $http({
            method:"GET",
            url:"/service/sessiontbl/"+sessionId
        }).then(function(result){
            that.sessionList=result.data;
            console.log(result.data);
            return result.data;
        });
    };
    
    
     this.postsessionList=function(dataParam){
         alert("i am here");
        return $http({
            method:"POST",
            url:"/service/sessiontbl",
            data:dataParam
            
        }).then(function(result){
            //that.personList=result.data;
            return result.status;
        });
     }
     this.deletesessionList=function(sessionId){
         return $http({
             method:"DELETE",
             url:"/service/sessiontbl/"+sessionId
         }).then(function(result){
             return result.status;
         })
     }
     this.updatesessionList=function(dataParam,sessionId){
         console.log("Testing the update person list dataparams")
         console.log(dataParam);
         console.log(sessionId);
         return $http({
             method:"PUT",
             url:"/service/sessiontbl/"+sessionId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);
angular.module("myapp").service("batchHttp",["$http",function($http){
    this.test="val from service";
    this.batchList=[];
    var that=this;
    this.getbatchList=function(){
        return $http({
            method:"GET",
            url:"/service/batchtbl"
        }).then(function(result){
            console.log("yaha  samma bhayoo ");
            that.batchList=result.data;
            return result.data;
        });
    };
    
    this.getbatchListUniq=function(batchId){
        return $http({
            method:"GET",
            url:"/service/batchtbl/"+batchId
        }).then(function(result){
            that.batchList=result.data;
            console.log(result.data);
            return result.data;
        });
    };
    
    
     this.postbatchList=function(dataParam){
         alert("i am here");
        return $http({
            method:"POST",
            url:"/service/batchtbl",
            data:dataParam
            
        }).then(function(result){
            return result.status;
        });
     }
     this.deletebatchList=function(batchId){
         return $http({
             method:"DELETE",
             url:"/service/batchtbl/"+batchId
         }).then(function(result){
             return result.status;
         })
     }
     this.updatebatchList=function(dataParam,batchId){
         console.log("Testing the update person list dataparams");
         console.log(dataParam);
         console.log(batchId);
         return $http({
             method:"PUT",
             url:"/service/batchtbl/"+batchId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);
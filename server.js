
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var connection = require("express-myconnection");
var basePath = "/service";

var app = express();

app.use(bodyParser.json());  //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ //to support URL-encoded bodies
    extended:true
}));

// Create Sql Connection
app.use(connection(mysql, {
    host     : 'localhost',
    user     : 'personuser',
    password : 'xyz123',
    database : 'cubic'
},'request'));

var getDeleteObj={
    studenttbl:{
        url:basePath+"/studenttbl/:studentId",
        query:"DELETE FROM studenttbl WHERE studentId = ?",
        ids:["studentId"]
    },
    teachertbl:{
    url:basePath+"/teachertbl/:teacherId",
    query:"DELETE FROM teachertbl WHERE teacherId = ?",
        ids:["teacherId"]
},
    classtbl:{
        url:basePath+"/classtbl/:classId",
        query:"DELETE FROM classtbl WHERE classId = ? ",
        ids:["classId"]
    },
    sessiontbl:{
        url:basePath+"/sessiontbl/:sessionId",
    query:"DELETE FROM sessiontbl WHERE sessionId =?",
        ids:["sessionId"]
    },
    batchtbl:{
        url:basePath+"/batchtbl/:batchId",
        query:"DELETE FROM batchtbl WHERE batchId = ? ",
        ids:["batchId"]
        
    }

}
var getPutObj={
    person:{
        "url":basePath+"/studenttbl/:studentId",
        "query":"UPDATE studenttbl SET ? WHERE studentId = ?",
        "ids":["studentId"]
    }
}
var getPostObj={
    student:{
        query:"INSERT INTO studenttbl set ?",
        url:basePath+"/studenttbl",
        ids:[]
    },
    teacher:{
       query:"INSERT INTO teachertbl set ?",
        url:basePath+"/teachertbl",
        ids:[]
    },
     class:{
       query:"INSERT INTO classtbl set ?",
        url:basePath+"/classtbl",
        ids:[]
    },
     session:{
       query:"INSERT INTO sessiontbl set ?",
        url:basePath+"/sessiontbl",
        ids:[]
    },
    batch:{
        query:"INSERT INTO batchtbl set ?",
        url:basePath+"/batchtbl",
        ids:[]
    }
}


var getServiceObj = {
    studenttbl:{
        query:"SELECT * FROM studenttbl",
        url:basePath+"/studenttbl",
        ids:[]
    },
    
   studenttblUnique:{
        query:"SELECT * FROM studenttbl where studentId=?",
        url:basePath+"/studenttbl/:studentId",
        ids:["studentId"]
    },
    
    teachertbl:{
           query:"SELECT * FROM teachertbl",
           url:basePath+"/teachertbl",
           ids:[]
   },
    teachertblUnique:{
        query:"SELECT * FROM teachertbl where teacherId=?",
        url:basePath+"/teachertbl/:teacherId",
        ids:["teacherId"]
    },
    
      classtbl:{
           query:"SELECT * FROM classtbl",
           url:basePath+"/classtbl",
           ids:[]
      },
    classtblUnique:{
        query:"SELECT * FROM classtbl where classId=?",
        url:basePath+"/classtbl/:classId",
        ids:["classId"]
    },
    
     batchtbl:{
           query:"SELECT * FROM batchtbl",
           url:basePath+"/batchtbl",
           ids:[]
      },
    batchtblUnique:{
        query:"SELECT * FROM batchtbl where batchId=?",
        url:basePath+"/batchtbl/:batchId",
        ids:["batchId"]
     },
   
    sessiontbl:{
           query:"SELECT * FROM cubic.sessiontbl",
           url:basePath+"/sessiontbl",
           ids:[]
      },
    sessiontblWithTeacher:{
        query : "SELECT * FROM cubic.sessiontbl s, cubic.teachertbl t where s.teacherId = t.teacherId",
        url: basePath+"/sessionteacher",
        ids: []
    },
    sessiontblUnique:{
        query:"SELECT * FROM cubic.sessiontbl where sessionId=?",
        url:basePath+"/sessiontbl/:sessionId",
        ids:["sessionId"]
    } 
};
for(var key in getServiceObj){
 getServices(getServiceObj[key].url,getServiceObj[key].ids,getServiceObj[key].query);
}

for(var key in getPostObj){
 postServices(getPostObj[key].url,getPostObj[key].ids,getPostObj[key].query);
}

for(var key in getPutObj){
 putServices(getPutObj[key].url,getPutObj[key].ids,getPutObj[key].query);
}
for(var key in getDeleteObj){
 deleteServices(getDeleteObj[key].url,getDeleteObj[key].ids,getDeleteObj[key].query);
}
function getServices(url,ids,query){
    app.get(url,function(req,res,next){   
       req.getConnection(function(err, connection) {
          if (err) return next(err);
          connection.query(query,req.params[ids], function(err, results) {
            if (err){
              console.log(err);
              return next("Mysql error, check your query");  
            }         
            res.json(results);
          });      
        });   
    });
}

function postServices(url,ids,query){
    app.post(url,function(req,res,next){
        var reqObj = req.body;
        req.getConnection(function(err, connection){
            if (err) return next(err);
            connection.query(query,reqObj,function(err,results){
                if (err){
                    console.log(err);
                    return next("Mysql error, check your query ");  
                }         
                res.json(results);
            });
        });
    });
}

function putServices(url,ids,query){
    app.put(url,function(req,res,next){
        var id=req.params[ids];
        var reqObj = req.body;
        req.getConnection(function(err, connection){
            if (err) return next(err);
            connection.query(query,[reqObj,id],function(err,results){
                if (err){
                    console.log(err);
                    return next("Mysql error, check your query ");  
                }         
                res.json(results);
            });
        });
    });
}

function deleteServices(url,ids,query){
    app.delete(url,function(req,res,next){
        req.getConnection(function(err, connection){
            if (err){
                return next(err);
            }
            connection.query(query, req.params[ids], function(err, results){
                if (err){
                    console.log(err);
                }
                res.json(results);
            })
        })
        
    })
}

//Hosting static files
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.redirect('/views/student.html');
});




app.listen(8080,function(req,res){
	
});
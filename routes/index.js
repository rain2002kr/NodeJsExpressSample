var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');


function authIsOwner(request,response){
    if(request.session.islogined){
        return true;
    } else {
        return false;
    }
}
function authStatusUI(request,response){
    var authStatusUI= `<a href="/auth/login">login</a>`
    if(authIsOwner(request,response)){
       console.log(request.session.nickname);    
       authStatusUI= `${request.session.nickname} | <a href="/auth/logout">logout</a>`
    } 
    return authStatusUI;
}

//WEB PAGE Content load 
router.get('/', function (request, response) {
    
    console.log(request.session);
    
    var filelist = request.filelist;
    var title = 'Welcome3';
    var descriton = 'Hello, Node.js';
    var create = ``
    if(authIsOwner(request,response)){
        create = `<a href="/topic/create">create</a>`
    }

    var list = template.list(filelist)
    var html = template.html(title,list,
        `
        <h2>${title}</h2>
        <p>${descriton}</p>
        <img src="/images/coding.jpg" style="width:1000px; height:500px; display:block; margin-top:10px;">
        `
        ,
        `${create}`
        ,
        authStatusUI(request,response)
        );
    response.send(html);
    
});



module.exports = router;

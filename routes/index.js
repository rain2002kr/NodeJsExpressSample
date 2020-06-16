var express = require('express');
var router = express.Router();
var template = require('../lib/template1.js');

//WEB PAGE Content load 
router.get('/', function (request, response) {
    var filelist = request.filelist;
    var title = 'Welcome3';
    var descriton = 'Hello, Node.js';
    var list = template.list(filelist)
    var html = template.html(title,list,
        `<h2>${title}</h2>
        <p>${descriton}</p>
        <img src="/images/coding.jpg" style="width:1000px; height:500px; display:block; margin-top:10px;">
        `
        ,
        `<a href="/topic/create">create</a>`
         );
    response.send(html);
    
});

module.exports = router
var express = require('express');
var router = express.Router();
var fs = require('fs');
var template = require('../lib/template1.js');
var path = require('path');


//CREATE Method is GET 
router.get('/create', function(request, response){
    var filelist = request.filelist;
    var title = 'WEB - create';
    var list = template.list(filelist)
    var html = template.html(title,list,`
    <form action="/topic/create_process"
        method="POST">
        <p><input type="text" name="title" placeholder="title"></p>

        <p><textarea name="description"></textarea></p>

        <p><input type="submit"></p>

        </form>
    
    `,'');
    response.send(html);
    
});

//CREATE PROCESS Method is POST 
router.post('/create_process', function (request, response) {
       var post = request.body;
       var title = post.title;
       var description = post.description;
       
       fs.writeFile(`data/${title}`,description,'utf8',function(err){
           //response.redirect('/?id=${title}');     
           response.redirect(`/topic/${title}`);     
       });
}); 

//UPDATE get
router.get('/update/:pageId', function(request, response){
            
    var filteredId = path.parse(request.params.pageId).base; //경로 세탁
    var filelist = request.filelist;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var title = filteredId;
        var list = template.list(filelist)
        var html = template.html(title,list,
            `
            <form action="/topic/update_process" method="post">
                <input type="hidden" name="id" value="${title}">
            <p>
                <input type="text" name="title" placeholder="title" value="${title}">
            </p>
            <p>
                <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
            `,
            `
            <a href="/topic/create">create</a> 
            <a href="/topic/update/${title}">update</a>

            
            `
        );
        response.send(html);
        });
    
});

//UPDATE PROCESS Method POST
router.post('/update_process', function(request, response){
    var post = request.body;
        var title = post.title;
        var id = path.parse(post.id).base; //경로세탁 
        var description = post.description;
        fs.rename(`data/${id}`,`data/${title}`, function(error){
            fs.writeFile(`data/${title}`,description, 'utf8',function(err){
                response.redirect(`/topic/${title}`);
            })
        })
});

//DELETE Methode is POST
router.post('/delete_process', function (request, response){
    var post = request.body;
    var id = path.parse(post.id).base; //경로세탁 
    fs.unlink(`data/${id}`,function(error){
        response.redirect('/');
    });
}); 

//WEB PAGE load 
router.get('/:pageId', function(request, response, next){
    //형식은 'user내가 치는거대로+ Id' ex page를 쳤다면 pageId
    var filelist = request.filelist;
    var filteredId = request.params.pageId

    fs.readFile(`data/${filteredId}`,'utf8',function(err,descriton){
    if(err)   {
        next(err);
    } else {
        var title = filteredId;
        var list = template.list(filelist)
        var html = template.html(title,list,
            `<h2>${title}</h2>${descriton}`,
            `
            <a href="/topic/create">create</a>  
            <a href="/topic/update/${title}">update</a>
            
            <form action="/topic/delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
            </form>
            `
            );
        response.send(html);
    }
    });
});

module.exports = router;
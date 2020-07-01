var express = require('express');
var router = express.Router();
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var fs = require('fs');
var template = require('../lib/template.js');
var path = require('path');

//사용자 id 와 password
var authDate = {
    email:'rain2002kr@naver.com',
    password:'111',
    nickname:'rain2002kr'
}

//LOGIN 
router.get('/login', function(request, response){
    var filelist = request.filelist;
    var title = 'WEB - login';
    var list = template.list(filelist)
    var html = template.html(title,list,`
    <form action="/auth/login_process"
        method="POST">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>

        <p><input type="submit" vlaue="login"></p>

        </form>
    
    `,'');
    response.send(html);
    
});

//LOGIN PROCESS Method is POST 
router.post('/login_process', function (request, response) {
    var post = request.body;
    var email = post.email;
    var password = post.password;
    console.log(email)
    console.log(password)

    
    if(email === authDate.email && password === authDate.password){
        request.session.islogined = true;  //세션에 로그인 유무 저장 
        request.session.nickname = authDate.nickname; //저장 했을때 구분하기 위한 닉네임을 세션에 저장. //쿠키생성 및 세션데이터의 변화를 확인 
        response.redirect(`/`);     
    }else{
        response.send('who are you?')        
    }
}); 


//LOGOUT 
router.get('/logout', function(request, response){
    request.session.destroy(function(err){
        response.redirect('/');
    })
});


module.exports = router;
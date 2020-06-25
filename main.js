// 익스프레스  
const express = require('express');
// 미들웨어 
var bodyParser = require('body-parser');
var helmet = require('helmet')
var compression = require('compression');
// 프로젝트 라우터
var topicRouter = require('./routes/router')
var indexRouter = require('./routes/index')

var fs = require('fs');
const port = 3000
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression()); //압축을 위한 솔루션
app.use(helmet()); //보안을 위한 솔루션 

//미들웨어 만들어 사용하기 
app.get('*',function(req,res, next){
    fs.readdir('./data', function(err, filelist){
        req.filelist = filelist;
        next();
    });
});
//public 폴더를 정적폴더로 지정 
app.use(express.static('public'));
app.use('/topic', topicRouter);
app.use('/', indexRouter);


//ERROR Handlers default
app.use(function(req, res, next) {	
    res.status(404).send('Sorry cant find that!');
});

//SERVER ERROR(서보 오류발생)
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




/*
var template = require('./lib/template1.js');
var qs = require('querystring');
var path = require('path');*/

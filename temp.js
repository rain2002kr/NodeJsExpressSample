//temp test
const express = require('express')
const app = express()
const port = 3000

//MAIN Page 
app.get('/', function (request, response) {
    var input_pageId = ['page1','page2','page3'];
    var html =       
        `<a href="/create/${input_pageId[0]}">page1</a><br>
         <a href="/create/${input_pageId[1]}">page2</a><br>
         <a href="/create/${input_pageId[2]}">page3</a><br>`
        response.send(html);
});

//WEB PAGE Content load by pageId
app.get('/create/:pageId', function (request, response) {
    var filteredId = request.params.pageId
    var html = 
        `
        <h1>${filteredId}<h1>
        <a href="/">home</a>
        `
    response.send(html);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

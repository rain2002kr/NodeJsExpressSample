var CRUD = {
    homeReaddir : fs.readdir('./data', function(err, filelist){
        var title = 'Welcome';
        var descriton = 'Hello, Node.js';
        var list = template.list(filelist)
        var html = template.html(title,list,
            `<h2>${title}</h2>${descriton}`,
            `<a href="/create">create</a>`
            
            );
        response.writeHead(200);   //웹서버와 브라우저간에 통신하기 위한 간결한 약속 200 성공 문자
        response.end(html);
    }),
    createReaddir : fs.readdir('./data', function(err, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist)
        var html = template.html(title,list,`
        <form action="/create_process"
            method="POST">
            <p><input type="text" name="title" placeholder="title"></p>

            <p><textarea name="description"></textarea></p>

            <p><input type="submit"></p>

            </form>
        
        `,'');
        response.writeHead(200);   //웹서버와 브라우저간에 통신하기 위한 간결한 약속 200 성공 문자
        response.end(html);
    }),
    createProcessRequestOn : function(){
        var body ='';
        request.on('data', function(data){
            body = body + data;
            //용량이 크면 끊는 코드도 넣을수 있음. 
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            
            fs.writeFile(`data/${title}`,description,'utf8',function(err){
                if(err){

                }else{
                    response.writeHead(302, {location:'/?id=${title}'});
                    response.end();        
                }
                
            })
        });
    }
};
   

module.exports = CRUD;

module.exports = {
    html : function (title,list,body, control){
        return `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 -${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/stylesheet/style.css">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <div class="items">
            ${list}
        </div>
        ${control}
        ${body}
       
        </body>
        </html>
        `;
    }, 
    list : function (filelist){
        var list = `<ul>`;
        var i = 0;
        while(i < filelist.length){
            list = list + `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;                        
            i = i+ 1;
        }
        list = list +`</ul>`;
        return list;
    }
    
}



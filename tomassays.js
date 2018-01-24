//include http, fs and url module
var http = require('http'),
    fs = require('fs'),
    url = require('url');
 
//create http server listening on port 3333
http.createServer(function (req, res) {
    //use the url to parse the requested url and get the image name
    var query = url.parse(req.url,true).query;
        pic = query.image;
 

    //get items in images folder
    global.items = []
    fs.readdirSync('./images/').forEach(file => {
        items.push(file);
    }) 

    //read the image using fs and send the image content back in the response
    fs.readFile('./images/' + items[Math.floor(Math.random()*items.length)], function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");    
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
    });
}).listen(8080);
console.log("Server running at http://localhost:8080/");
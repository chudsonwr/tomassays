//include http, fs and url module
var http = require('http'),
    fs = require('fs'),
    url = require('url');
 


//create http server listening on port 3333
http.createServer(function (req, res) {
    //use the url to parse the requested url and get the image name
    var query = url.parse(req.url,true).query;
    if (query.token != process.env.TOMASSAYS_TOKEN) {
        res.writeHead(403, {'Content-type':'text/html'})
        console.log('token supplied:')
        console.log(query.token)
        console.log('Token in env var')
        console.log(process.env.TOMASSAYS_TOKEN)
        res.end("wrong token");
    } else {
    
        pic = query.image;

         global.items = []
 fs.readdirSync('./images/').forEach(file => {
    items.push(file);
 }) 

  if (pic) {  
    //read the image using fs and send the image content back in the response
    fs.readFile('./images/' + pic, function (err, content) {
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
  } else {
    
     res_object = {}
            arr = []
            imageattach = {}
            imageattach["image_url"] = "https://jenkins.csre.worldremit.com:1337/?token=igA5lsULEC6eVhhoiyW7KaQ4&image=" + items[Math.floor(Math.random()*items.length)]
            arr.push(imageattach)
            res_object['attachments'] = arr
            res_object['text'] = "Tomas Says....."
            res_object['parse'] = 'full'
            res_object['response_type'] = 'in_channel'
            res_object['unfurl_media'] = true
            res_object['unfurl_links'] = true
            res.writeHead(200,{'Content-type':'application/json'});
            res.end(JSON.stringify(res_object));

  }

}}).listen(1338);
console.log("Server running at http://localhost:1338/");
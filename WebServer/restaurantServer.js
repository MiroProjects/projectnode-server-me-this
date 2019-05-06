const http = require('http');
const Request = require('./restaurantRequest');
const Response = require('./restaurantResponse');
var qs = require('querystring');

const restaurantServer = function(){
    this.urlCollection = {};
    this.postCollection = {};
}

restaurantServer.prototype.get = function(path, callback){
    this.urlCollection[path] = callback;
}

restaurantServer.prototype.post = function(path, callback){
    this.postCollection[path] = callback;
}

restaurantServer.prototype.run = function (PORT, callback) {
    sortUrlCollection(this.urlCollection);

    this.serverInstance = http.createServer((req, res) => {
        //URL: /tables/2
        var path = req.url.split('/');
        //[/,tables,2]
        path.shift();
        //[tables,2]
        var url = path.join('/');
        //tables/2

        var requestReference = new Request(req);
        var responseReference = new Response(res);

        if (req.method == "POST") {
            var postDataCollection = "";
            req.on('data', (chunk) => {
                postDataCollection += chunk.toString();
            });

            req.on('end', () => {
                var parsedObj = qs.parse(postDataCollection);  
                requestReference.body(parsedObj);
                matchUrlResourse(this.postCollection, url, requestReference, responseReference);
            });
        }
        else if(req.method == "GET"){
            matchUrlResourse(this.urlCollection, url, requestReference, responseReference);
        }
    });

    this.serverInstance.listen(PORT);
    callback();
}

var matchRegex = (route) => {
    return new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
};

var sortUrlCollection = (urlCollection) => {
    const orderedUrlCollection = {};
    var keys = Object.keys(urlCollection);
    keys.sort((a, b) => b.length - a.length);
    keys.forEach(key => orderedUrlCollection[key] = urlCollection[key]);
    urlCollection = orderedUrlCollection;
};

var matchUrlResourse = (urlCollection, url, requestReference, responseReference) => {
    for (var route in urlCollection) {
        if (urlCollection.hasOwnProperty(route)) {
            var found = url.match(matchRegex(route));
            if (found) {
                requestReference.args(found.slice(1));
                urlCollection[route](requestReference, responseReference);
                return;
            }
        }
    }
    urlCollection["error"](requestReference, responseReference);
};

module.exports = restaurantServer;
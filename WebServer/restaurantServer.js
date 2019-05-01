const http = require('http');
const Request = require('./restaurantRequest');
const Response = require('./restaurantResponse');

const restaurantServer = function(){
    this.urlCollection = {};
}

restaurantServer.prototype.get = function(path, callback){
    this.urlCollection[path] = callback;
}

restaurantServer.prototype.run = function (PORT, callback) {

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

        for(var route in this.urlCollection){
            if (this.urlCollection.hasOwnProperty(route)) {
                var found = url.match(matchRegex(route));
                if (found) {
                    requestReference.args(found.slice(1));
                    this.urlCollection[route](requestReference, responseReference);
                    break;
                }
            }
        }
    });

    this.serverInstance.listen(PORT);
    callback();
}

var matchRegex = (route) => {
    return new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
};

module.exports = restaurantServer;
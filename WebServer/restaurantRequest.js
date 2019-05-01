const Request = function(req) {
    this.requestObject = req;
}

Request.prototype.args = function(args){
    this.args = args;
}

Request.prototype.body = function(bodyCollection){
    this.bodyCollection = bodyCollection;
}

module.exports = Request;
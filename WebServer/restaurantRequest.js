const Request = function(req) {
    this.requestObject = req;
}

Request.prototype.args = function(args){
    this.args = args;
}

module.exports = Request;
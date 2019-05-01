var fs = require('fs');
const path = './Views/';
const baseFileToLoad = 'base.html';

const Response = function(resp) {
    this.responseObject = resp;
}

Response.prototype.html = function(html){
    this.responseObject.write(html);
    this.responseObject.end();
}

Response.prototype.setResponseHeader = function(statusCode, responseObj){
    this.responseObject.writeHead(statusCode, responseObj);
}

Response.prototype.loadHtmlFile = function (file, optionalHtml) {
    fs.readFile(`${path}${baseFileToLoad}`, (err, baseData) => {
        if (!err) {
            fs.readFile(`${path}${file}`, (err, data) => {
                if (!err) {
                    baseData += data;
                    if (optionalHtml) {
                        baseData += optionalHtml;
                    }
                    this.setResponseHeader(200, { "Content-Type": "text/html" });
                    this.html(baseData);
                }
                else{
                    this.html(JSON.stringify(err));
                }
            });
        }
        else{
            this.html(JSON.stringify(err));
        }
    });
}

module.exports = Response;
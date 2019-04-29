var TableManager = require('./Managers/TableManager');

var tables = [];
//8x2
for (let index = 0; index < 8; index++) {
    tables.push(TableManager.createTable(2));   
}
//6x4
for (let index = 0; index < 6; index++) {
    tables.push(TableManager.createTable(4));   
}
//5x8
for (let index = 0; index < 5; index++) {
    tables.push(TableManager.createTable(8));   
}
//1x12
tables.push(TableManager.createTable(12));

module.exports = {
    tables
}
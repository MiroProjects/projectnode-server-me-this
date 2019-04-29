var Restaurant = require('./build-tables');
var TableManager = require('./Managers/TableManager');

Restaurant.tables.forEach(table => {
    TableManager.printTableInfo(table);
});
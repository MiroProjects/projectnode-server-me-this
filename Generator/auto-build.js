var TableManager = require('../Managers/TableManager');
var MenuManager = require('../Managers/MenuManager');
var Database = require('../Modules/database_script');

var Restaurant = {
    tables : [],
    mainMenu : MenuManager.createMenu("Main Menu"),
    database : Database.newDatabase("RestaurantDb")
};

//Build all the tables in the current restaurant
var createAllTables = function () {
    //8x2
    for (let index = 0; index < 8; index++) {
        Restaurant.tables.push(TableManager.createTable(2));
    }
    //6x4
    for (let index = 0; index < 6; index++) {
        Restaurant.tables.push(TableManager.createTable(4));
    }
    //5x8
    for (let index = 0; index < 5; index++) {
        Restaurant.tables.push(TableManager.createTable(8));
    }
    //1x12
    Restaurant.tables.push(TableManager.createTable(12));
}
createAllTables();

var createDbTable = function() {
    Restaurant.dbTable = Database.newTable("Orders", Restaurant.database);
};
createDbTable();

module.exports = Restaurant;
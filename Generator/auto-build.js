var TableManager = require('../Managers/TableManager');
var MenuManager = require('../Managers/MenuManager');

var Restaurant = {
    tables : []
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

//Create menu
Restaurant.mainMenu = MenuManager.createMenu("Main Menu");

Restaurant.getAllTablesInfoHtml = () => {
    var tablesHtml = `<div class="container-fluid"><div class="row">`;
    for (let index = 0; index < Restaurant.tables.length; index++) {
        if (index % 4 == 0 && index != 0) {
            tablesHtml += "</div><div class='row'>";
        }
        tablesHtml += TableManager.getTableInfoHtml(Restaurant.tables[index]);
    }
    tablesHtml += `</div></div>`;
    return tablesHtml;
}

Restaurant.getTableByNumber = (number) => {
    return Restaurant.tables.find(function(table){
        return table.number == number;
    });
}

module.exports = Restaurant;
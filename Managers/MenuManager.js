var Menu = require('../Models/Menu');
var ItemManager = require('../Managers/ItemManager');

var createMenu = (name) => {
    return new Menu(name);
};

var addItem = (menuItem, menu) => {
    menu.menuItems.push(menuItem);
};

var addItems = (menuItems, menu) => {
    menuItems.forEach(menuItem => {
        addItem(menuItem, menu);
    });
};

var printMenu = (menu) => {
    menu.menuItems.forEach(menuItem => {
        ItemManager.printItem(menuItem);
    });
};

module.exports = {
    createMenu,
    addItem,
    addItems,
    printMenu
};
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

var getMenuHtml = (menu) => {
    var menuItems = "";
    menu.menuItems.forEach(menuItem => {
       menuItems += ItemManager.getItemHtml(menuItem);
    });
    return `<h1>Menu</h1>${menuItems}`;
};

module.exports = {
    createMenu,
    addItem,
    addItems,
    getMenuHtml
};
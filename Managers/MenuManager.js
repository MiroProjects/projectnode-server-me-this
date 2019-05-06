var Menu = require('../Models/Menu');
var ItemManager = require('../Managers/ItemManager');

var counter = 1;
var menus = [];

var incrementCounter = () => {
   return counter++;
};

var createMenu = (name) => {
    var menu = new Menu(incrementCounter(), name);
    menus.push(menu);
    return menu;
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

var getAllMenuItemsHtml = (menu) => {
    var menuItems = "";
    menu.menuItems.forEach(menuItem => {
        menuItems += ItemManager.getItemHtmlForCreatingOrder(menuItem);
    });
    return menuItems;
};

module.exports = {
    createMenu,
    addItem,
    addItems,
    getMenuHtml,
    getAllMenuItemsHtml
};
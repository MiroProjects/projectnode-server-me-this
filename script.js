var menu = require('./Managers/MenuManager');
var item = require('./Managers/ItemManager');
var Category = require('./Enums/Category');

var item1 = item.createItem(Category.Drinks, "Fanta", 1.99, 250, "Fanta drink");
var item2 = item.createItem(Category.MainDishes, "Chicken", 12.99, 550, "A");
var item3 = item.createItem(Category.Desserts, "Ice cream", 4.99, 150, "1");
var item4 = item.createItem(Category.Drinks, "Cola", 0.99, 350, "2");
var item5 = item.createItem(Category.WarmAppetizers, "Soup", 2.99, 300, "3");

var arr = [item1, item3, item4];

var mainMenu = menu.createMenu("Main menu");

menu.addItem(item1, mainMenu);
menu.addItem(item2, mainMenu);
menu.addItem(item3, mainMenu);
menu.addItem(item4, mainMenu);
menu.addItem(item5, mainMenu);

item.markRemoved(item1);

menu.printMenu(mainMenu);

console.log("---------------------------");

var dailyMenu = menu.createMenu("Daily");
menu.addItems(arr, dailyMenu);
menu.printMenu(dailyMenu);
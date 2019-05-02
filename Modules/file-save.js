var fs = require('fs');
var File = {};

File.writeOrder = (order) => {
    var orderStructure = `Order: ${order.id}, Order state: ${order.state}, Order total pirce: ${order.totalPrice}, Order items: ${getAllOrderItems(order)}`;

    fs.appendFile("orders.txt", orderStructure, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
};

File.writeOrders = (orders) => {
    var allOrders = "";
    orders.forEach(order => {
        allOrders += `Order: ${order.id}, Order state: ${order.state}, Order total pirce: ${order.totalPrice}, Order items: ${getAllOrderItems(order)}\n`;
    });

    fs.appendFile("orders.txt", allOrders, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
};

var getAllOrderItems = (order) => {
    var items = "";
    order.items.forEach(item => {
        items += `${item.id}:${item.name}|`;
    });
    return items;
};

module.exports = File;
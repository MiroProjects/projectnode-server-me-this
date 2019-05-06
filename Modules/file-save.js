var fs = require('fs');
var File = {};

File.writeOrders = (orders) => {
    var date = new Date();
    var text = `Orders for: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}\n`;
    var allOrders = "";
    orders.forEach(order => {
        allOrders += `Order: ${order.id}, Order state: ${order.state}, Order total pirce: ${order.totalPrice}, Order items: ${getAllOrderItems(order)}\n`;
    });

    text += allOrders;
    fs.appendFile("orders.txt", text, function(err) {
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
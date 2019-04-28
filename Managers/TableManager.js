var Table = require('../Models/Table');
var OrderManager = require('../Managers/OrderManager');

var counter = 1;

var incrementCounter = () => {
   return counter++;
};

var createTable = (seats) => {
    if (!(Number.isFinite(seats) && seats > 0 && seats < 13)) {
        console.log("Enter a valid number for the seats");
        return null;
    }
    return new Table(seats, incrementCounter());
};

var addOrder = (order, table) => {
    table.orders.push(order);
};

var addOrders = (orders, table) => {
    orders.forEach(order => {
        addOrder(order, table);
    });
}

var addWaiter = (waiter, table) => {
    table.waiter = waiter;
}

var reserveTable = (table) => {
    table.isFree = false;
}

var freeTable = (table) => {
    table.orders = [];
    table.waiter = "";
    table.isFree = true;
}

var printAllTableOrders = (table) => {
    table.orders.forEach(order => {
        console.log("-------------------");
        OrderManager.printOrderItems(order);
    });
};

var printTableInfo = (table) => {
    console.log(`Table №: ${table.number}, Seats: ${table.seats}, Reserved: ${!table.isFree}, waiter: ${table.waiter}`);
};

module.exports = {
    createTable,
    addOrder,
    addOrders,
    addWaiter,
    reserveTable,
    freeTable,
    printAllTableOrders,
    printTableInfo
};
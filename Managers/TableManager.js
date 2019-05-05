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

var getAllTableOrdersHtml = (table) => {
    var allOrderItemsHtml = "";
    table.orders.forEach(order => {
        allOrderItemsHtml += OrderManager.getOrderItemsHtml(order);
    });
    return `<h1>Table: ${table.number}</h1>${allOrderItemsHtml}`;
};

var getTableInfoHtml = (table) => {
    return `<div class='col-md-3'"; 
    style='text-align: center; border: solid #f0f2f4 2px; height: 209px'>
            <p>Table №: ${table.number}</p>
            <p>Seats: ${table.seats}</p>
            <p>Reserved: ${!table.isFree}</p>
            <p>Waiter: ${table.waiter}</p>
            <a class="btn btn-light" href="table/${table.number}" role="button">View</a>
            <a class="btn btn-light" href="table/${table.number}/order/create" role="button">Add order</a>
            <a class="btn btn-light" href="table/${table.number}/waiter" role="button">Add waiter</a>
            </div>`;
};

module.exports = {
    createTable,
    addOrder,
    addOrders,
    addWaiter,
    reserveTable,
    freeTable,
    getAllTableOrdersHtml,
    getTableInfoHtml
};
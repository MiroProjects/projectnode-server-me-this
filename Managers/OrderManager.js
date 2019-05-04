var Order = require('../Models/Order');
var OrderState = require('../Enums/OrderState');
var ItemManager = require('../Managers/ItemManager');

var counter = 1;
var orders = [];

var incrementCounter = () => {
   return counter++;
};

var createOrder = () => {
    var order = new Order(incrementCounter());
    order.state = OrderState.Made;
    orders.push(order);
    return order;
};

var addItem = (item, order) => {
    order.items.push(item);
}

var addItems = (items, order) => {
    items.forEach(item => {
        addItem(item, order);
    });
}

var calculatePrice = (order) => {
    var sum = 0;

    order.items.forEach(item => {
        sum += parseInt(item.price);
    });
    return order.totalPrice = sum;
};

var orderChangeState = (state, order) => {
    if (!checkState(state)) {
        console.log("Choose one of the main states!");
        return;
    }

    order.state = state;
};

var checkState = (state) => {
    var flag = false;
    if (Object.values(OrderState).indexOf(state) > -1) {
        flag = true;
    }
    return flag;
};

var getOrderItemsHtml = (order) => {
    var allItmesHtmlInOrder = "";
    order.items.forEach(item => {
        allItmesHtmlInOrder += ItemManager.getItemHtml(item);
    });

    return `<h2>Order №${order.id} Status: ${order.state}</h2>
    <a class="btn btn-light" href="order-update-cancel/${order.id}" role="button">Cancel</a>
    <a class="btn btn-light" href="order-update-finish/${order.id}" role="button">Finish</a>
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Weight</th>
            <th scope="col">Ingredients</th>
            <th scope="col">Removed</th>
            <th scope="col">Reason</th>
            <th scope="col">Option</th>
            <th scope="col">Option</th>
        </tr>
    </thead>
    <tbody>
    ${allItmesHtmlInOrder}
    </tbody>
    </table>`;
}

var getOrderById = (id) => {
    return orders.find(function(order){
        return order.id == id;
    });
};

var getAllOrders = () => {
    return orders;
};

module.exports = {
    createOrder,
    addItem,
    addItems,
    calculatePrice,
    orderChangeState,
    getOrderItemsHtml,
    getOrderById,
    getAllOrders
}
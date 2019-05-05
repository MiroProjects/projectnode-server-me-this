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
        sum += parseFloat(item.price);
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
        allItmesHtmlInOrder += ItemManager.getItemHtmlForOrder(item);
    });

    return `<hr style="border-top: 2px dotted #bfbfbf;"><h2>Order №${order.id}</h2><h2>Status: ${order.state}</h2>
    <a class="btn btn-light" style="margin-bottom: 5px;" href="order/${order.id}/cancel" role="button">Cancel</a>
    <a class="btn btn-light" style="margin-bottom: 5px;" href="order/${order.id}/finish" role="button">Finish</a>
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Weight</th>
            <th scope="col">Ingredients</th>
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

var areAllOrdersFinalized = (orders) => {
    var areFinalized = true;
     orders.forEach(order => {
        if (order.state == OrderState.Made) {
            areFinalized = false;
        }
    })
    return areFinalized;
};

module.exports = {
    createOrder,
    addItem,
    addItems,
    calculatePrice,
    orderChangeState,
    getOrderItemsHtml,
    getOrderById,
    getAllOrders,
    areAllOrdersFinalized
}
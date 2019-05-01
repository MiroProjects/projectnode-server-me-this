var Order = require('../Models/Order');
var OrderState = require('../Enums/OrderState');
var ItemManager = require('../Managers/ItemManager');

var createOrder = () => {
    return new Order();
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
        sum += item.price;
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

    return `<h2>Order:</h2>${allItmesHtmlInOrder}`;
}

module.exports = {
    createOrder,
    addItem,
    addItems,
    calculatePrice,
    orderChangeState,
    getOrderItemsHtml
}
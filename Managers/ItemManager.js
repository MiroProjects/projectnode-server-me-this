var Item = require('../Models/Item');
var Category = require('../Enums/Category');

var counter = 1;

var incrementCounter = () => {
   return counter++;
};

var createItem = (category, name, price, weight, ingredients) => {
    if (!ingredients) {
        console.log("Enter all the required information");
        return null;
    }

    if (!checkCategory(category)) {
        console.log("Choose one of the main categories!");
        return null;
    }

    if(!(Number.isFinite(price) || price > 0)){
        console.log("Enter a correct price!");
        return null;
    }

    if(!(Number.isFinite(weight) || weight > 0)){
        console.log("Enter a correct weight!");
        return null;
    }

    return new Item(incrementCounter(), category, name, price, weight, ingredients);
}

var checkCategory = (category) => {
    var flag = false;
    if (Object.values(Category).indexOf(category) > -1) {
        flag = true;
    }
    return flag;
};

var markRemoved = (item, reasonText) => {
    if (reasonText) {
        item.removedReason = reasonText;
        item.removed = true;   
    }
};

var markReturned = (item) => {
    item.removed = false;
    item.removedReason = "";
};

var getItemHtml = (item) => {
    return `<tr>
            <td>${item.category}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.weight}</td>
            <td>${item.ingredients}</td>
            <td>${item.removed}</td>
            <td>${item.removedReason}</td>
            <td><a class="btn btn-light" href="item-remove/${item.id}" role="button">Remove</a></td>
            <td><a class="btn btn-light" href="item-update/${item.id}" role="button">Return</a></td>
            </tr>`;
};

module.exports = {
    createItem,
    getItemHtml,
    markReturned,
    markRemoved
}
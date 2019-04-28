var Item = require('../Models/Item');
var Category = require('../Enums/Category');

var createItem = (category, name, price, weight, ingredients) => {
    if (!ingredients) {
        console.log("Enter all the required information");
        return null;
    }

    if (!checkCategory(category)) {
        console.log("Choose one of the main categories!");
        return null;
    }

    if(!(Number.isFinite(price) && price > 0)){
        console.log("Enter a correct price!");
        return null;
    }

    if(!(Number.isFinite(weight) && weight > 0)){
        console.log("Enter a correct weight!");
        return null;
    }

    return new Item(category, name, price, weight, ingredients);
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

var printItem = (item) => {
    console.log(`Category: ${item.category}, Name: ${item.name}, Price: ${item.price}, Weight: ${item.weight}, Ingredients: ${item.ingredients}, Removed: ${item.removed}, Reason: ${item.removedReason}`);
};

module.exports = {
    createItem,
    printItem,
    markReturned,
    markRemoved
}
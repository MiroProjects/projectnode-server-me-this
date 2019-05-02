var Item = function(id, category, name, price, weight, ingredients){
    this.id = id;
    this.category = category;
    this.name = name;
    this.price = price;
    this.weight = weight;
    this.ingredients = ingredients;
    //Information for removed items
    this.removed = false;
    this.removedReason = "";
};

module.exports = Item;
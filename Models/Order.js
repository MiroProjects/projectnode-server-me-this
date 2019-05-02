var Order = function(id){
    this.id = id;
    this.items = [];
    this.state = null;
    this.totalPrice = 0;
};

module.exports = Order;
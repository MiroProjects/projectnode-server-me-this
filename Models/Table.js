var Table = function(id, seats){
    this.number = id;
    this.seats = seats;
    this.orders = [];
    this.waiter = "";
    this.isFree = true;
};

module.exports = Table;
var Table = function(seats, number){
    this.number = number;
    this.seats = seats;
    this.orders = [];
    this.waiter = "";
    this.isFree = true;
};

module.exports = Table;
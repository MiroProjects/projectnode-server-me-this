//Server requirements
var restaurantServer = require('./WebServer/restaurantServer');
const PORT = 3000;
var server = new restaurantServer();

//Data requirements
var Restaurant = require('./Generator/auto-build');
var TableManager = require('./Managers/TableManager');
var MenuManager = require('./Managers/MenuManager');
var ItemManager = require('./Managers/ItemManager');
var OrderManager = require('./Managers/OrderManager');
var OrderState = require('./Enums/OrderState');
var File = require('./Modules/file-save');

//End points
//GET
server.get('home', (req, res) => {
    res.loadHtmlFile('home.html');
});

//GET
server.get('error', (req, res) => {
    res.loadHtmlFile('error.html', "", true);
});

//GET
server.get('table/:id/waiter', (req, res) => {
    res.loadHtmlFile('table-update-get.html');
});

//POST
server.post('table/:id/waiter', (req, res) => {
    var tableNumber = req.args[0];
    var table = TableManager.getTableByNumber(tableNumber);
    if (table) {
        var waiter = req.bodyCollection.waiter;
        TableManager.addWaiter(waiter, table);
        res.loadHtmlFile('table-update-post.html');   
    }
    else{
        res.loadHtmlFile('error.html', "", true);
    }
});

//GET
server.get('table/:id/reserve', (req, res) => {
    var tableNumber = req.args[0];
    var table = TableManager.getTableByNumber(tableNumber);
    if (table) {
        table.isFree = false;
        res.loadHtmlFile('table-reserve-get.html');
    }
    else{
        res.loadHtmlFile('error.html', "", true);
    }
});

//GET
server.get('table/:id/free', (req, res) => {
    var tableNumber = req.args[0];
    var table = TableManager.getTableByNumber(tableNumber);
    if (table) {
        var result = OrderManager.areAllOrdersFinalized(table.orders);
        if (result) {
            TableManager.freeTable(table);
            res.loadHtmlFile('table-free-get.html');   
        }
        else{
            res.loadHtmlFile('table-free-error.html'); 
        }   
    }
    else{
        res.loadHtmlFile('error.html', "", true);
    }
});

//GET
server.get('save', (req, res) => {
    var orders = OrderManager.getAllOrders();
    if (orders.length != 0) {
        var result = OrderManager.areAllOrdersFinalized(orders);
        if(result){
            File.writeOrders(orders);
            res.loadHtmlFile('save.html');
        }
        else{
            res.loadHtmlFile('save-error.html');
        }
    }
    else{
        res.loadHtmlFile('home.html');
    }
});

//GET
server.get('order/:id/cancel', (req, res) => {
    var order = OrderManager.getOrderById(req.args[0]);
    if (order) {
        OrderManager.orderChangeState(OrderState.Canceled, order);
        res.loadHtmlFile('order-update-get.html');
    }
    else{
        res.loadHtmlFile('error.html', "", true);
    }
});

//GET
server.get('order/:id/finish', (req, res) => {
    var order = OrderManager.getOrderById(req.args[0]);
    if (order) {
        OrderManager.orderChangeState(OrderState.Finished, order);
        OrderManager.calculatePrice(order);
        res.loadHtmlFile('order-update-get.html');   
    }
    else{
        res.loadHtmlFile('error.html', "", true);
    }
});

//GET
server.get('table/:id/order/create', (req, res) => {
    var optionalHtml = `${MenuManager.getAllMenuItemsHtml(Restaurant.mainMenu)}</tbody></table></div>
    <button type="submit" class="btn btn-primary btn-lg" style="margin: 20px 0px;" id="submit"
    onclick="return check()">Submit</button></form>
    <a class="btn btn-light" style="margin-bottom: 5px;" href="//localhost:3000/tables" role="button">Cancel</a></section>
    <h2>Added items for the order</h2>
    <section class="jumbotron" style="width: 80%; margin: 20px auto; border: solid #99ddff 1px;" id="result">
    </section>
    <script>
    var hidden = document.getElementById('hidden');
    var form = document.getElementById('form');
    var result = document.getElementById('result');
    var hiddenItems = document.getElementById('hidden-items');
    var items = [];
    var idCount = 0;

    var check = () => {
        if(items.length == 0){
            alert("Select items for the order!");
            return false;
        }
    };

    form.addEventListener('submit', () => {
        hidden.value = window.location.pathname.split('/')[2];
        hiddenItems.value = items;
    });

    var removeItem = (paragraph) => {
        paragraph.style.textDecoration = 'line-through';
    };

    var disableButton = (button) => {
        button.disabled = true;
    };

    var removeItemFromArray = (itemId) => {
        var index = items.indexOf(itemId);
        if (index > -1) {
            items.splice(index, 1);
        }
    };

    var getItem = (item) => {
        var quantity = document.getElementById('quantity-'+item.id);
        var count = 1;
        if(quantity.value && quantity.value > 1){
            count = quantity.value;
        }
        for (let index = 0; index < count; index++) {
            items.push(item.id);
            result.innerHTML += '<p class="lead" id="p'+idCount+'">Category: <strong>'+item.category+'</strong> Name: <strong>'+item.name+'</strong> Price: <strong>'+item.price+'</strong> Weight: <strong>'+item.weight+'</strong><button type="button" class="btn btn-danger" style="margin-left:5px;" id="btn'+idCount+'" onclick="removeItemFromArray('+item.id+');removeItem(p'+idCount+');disableButton(btn'+idCount+');">X</button></p>';
            idCount++;
        }
    };
    </script></body></html>`;
    res.loadHtmlFile('order-create-get.html', optionalHtml);
});

//POST
server.post('order/create', (req, res) => {
    var order = OrderManager.createOrder();
    var tableNumber = req.bodyCollection.number;
    var menuItems = req.bodyCollection.items.split(',');
    var table = TableManager.getTableByNumber(tableNumber);
    var items = [];
    menuItems.forEach((item) => {
        items.push(ItemManager.getItemById(item));
    });
    OrderManager.addItems(items, order);
    TableManager.addOrder(order, table);
    res.loadHtmlFile('order-create-post.html');
});

//GET
server.get('table/:id', (req, res) => {
    var table = TableManager.getTableByNumber(req.args[0]);
    if (table) {
        var optionalHtml = TableManager.getAllTableOrdersHtml(table);
        res.loadHtmlFile('table-detail.html', optionalHtml);   
    }
    else{
        res.loadHtmlFile('error.html', "", true);
    }
});

//GET
server.get('tables', (req, res) => {
    var optionalHtml = `${TableManager.getAllTablesInfoHtml()}</body></html>`;
    res.loadHtmlFile('table-list.html', optionalHtml);
});

//GET
server.get('items', (req, res) => {
    var optionalHtml = `${MenuManager.getMenuHtml(Restaurant.mainMenu)}</tbody></table></body></html>`;
    res.loadHtmlFile('item-list.html', optionalHtml);
});

//GET
server.get('item/:id/remove', (req, res) => {
    res.loadHtmlFile('item-remove-get.html');
});

//POST
server.post('item/:id/remove', (req, res) => {
    var id = req.args[0];
    var item = ItemManager.getItemById(id);
    if (item) {
        var reason = req.bodyCollection.reason;
        ItemManager.markRemoved(item, reason);
        res.loadHtmlFile('item-remove-post.html');
    }
    else{
        res.loadHtmlFile('error.html', "", true);
    }
});

//GET
server.get('item/:id/return', (req, res) => {
    res.loadHtmlFile('item-return-get.html');
});

//POST
server.post('item/:id/return', (req, res) => {
    var id = req.args[0];
    var item = ItemManager.getItemById(id);
    if (item) {
        ItemManager.markReturned(item);
        res.loadHtmlFile('item-return-post.html');   
    }
    else{
        res.loadHtmlFile('error.html', "", true);
    }
});

//GET
server.get('item/create', (req, res) => {
    res.loadHtmlFile('item-create-get.html');
});

//POST
server.post('item/create', (req, res) => {
    //Get the values
    var category = req.bodyCollection.category;
    var name = req.bodyCollection.name;
    var price = req.bodyCollection.price;
    var weight = req.bodyCollection.weight;
    var ingredients = req.bodyCollection.ingredients;

    //Add the item to the menu
    var item = ItemManager.createItem(category, name, price, weight, ingredients);
    MenuManager.addItem(item, Restaurant.mainMenu);

    //Load the html
    res.loadHtmlFile('item-create-post.html');
});

//GET
server.get('', (req, res) => {
    res.loadHtmlFile('home.html');
});

server.run(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
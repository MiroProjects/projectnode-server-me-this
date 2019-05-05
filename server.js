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
server.get('table/:id/waiter', (req, res) => {
    res.loadHtmlFile('table-update-get.html');
});

//POST
server.post('table/:id/waiter', (req, res) => {
    var tableNumber = req.args[0];
    var table = TableManager.getTableByNumber(tableNumber);
    var waiter = req.bodyCollection.waiter;
    TableManager.addWaiter(waiter, table);
    res.loadHtmlFile('table-update-post.html');
});

//GET
server.get('table/:id/reserve', (req, res) => {
    var tableNumber = req.args[0];
    var table = TableManager.getTableByNumber(tableNumber);
    table.isFree = false;
    res.loadHtmlFile('table-reserve-get.html');
});

//GET
server.get('table/:id/free', (req, res) => {
    var tableNumber = req.args[0];
    var table = TableManager.getTableByNumber(tableNumber);
    var result = OrderManager.areAllOrdersFinalized(table.orders);
    if (result) {
        TableManager.freeTable(table);
        res.loadHtmlFile('table-free-get.html');   
    }
    else{
        res.loadHtmlFile('table-free-error.html'); 
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
    OrderManager.orderChangeState(OrderState.Canceled, order);
    res.loadHtmlFile('order-update-get.html');
});

//GET
server.get('order/:id/finish', (req, res) => {
    var order = OrderManager.getOrderById(req.args[0]);
    OrderManager.orderChangeState(OrderState.Finished, order);
    OrderManager.calculatePrice(order);
    res.loadHtmlFile('order-update-get.html');
});

//GET
server.get('table/:id/order/create', (req, res) => {
    var optionalHtml = `${MenuManager.getAllMenuItemsHtml(Restaurant.mainMenu)}</select></div>
    <button type="submit" class="btn btn-primary btn-lg" style="margin: 20px 0px;" id="submit"
    onclick="return check()">Enter</button>
    </form>`;
    
    optionalHtml += `    
    <script>
    var hidden = document.getElementById('hidden');
    var form = document.getElementById('form');
    var select = document.getElementById('select');

    var check = () => {
        if(select.selectedIndex == -1){
            alert("Select items for the order!");
            return false;
        }
    };

    form.addEventListener('submit', () => {
        hidden.value = window.location.pathname.split('/')[2];
    });
    </script>`;
    optionalHtml += '</section></body></html>';
    res.loadHtmlFile('order-create-get.html', optionalHtml);
});

//POST
server.post('order/create', (req, res) => {
    var order = OrderManager.createOrder();
    var tableNumber = req.bodyCollection.number;
    var table = TableManager.getTableByNumber(tableNumber);
    var select = req.bodyCollection.select;
    if (Array.isArray(select)) {
        var items = [];
        select.forEach((el) => {
            items.push(ItemManager.getItemById(el));
        });   
        OrderManager.addItems(items, order);
    }
    else{
        OrderManager.addItem(ItemManager.getItemById(select), order);
    }
    TableManager.addOrder(order, table);
    res.loadHtmlFile('order-create-post.html');
});

//GET
server.get('table/:id', (req, res) => {
    var table = TableManager.getTableByNumber(req.args[0]);
    var optionalHtml = TableManager.getAllTableOrdersHtml(table);
    res.loadHtmlFile('table-detail.html', optionalHtml);
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
    var reason = req.bodyCollection.reason;
    var id = req.args[0];
    var item = ItemManager.getItemById(id);
    ItemManager.markRemoved(item, reason);
    res.loadHtmlFile('item-remove-post.html');
});

//GET
server.get('item/:id/return', (req, res) => {
    res.loadHtmlFile('item-return-get.html');
});

//POST
server.post('item/:id/return', (req, res) => {
    var id = req.args[0];
    var item = ItemManager.getItemById(id);
    ItemManager.markReturned(item);
    res.loadHtmlFile('item-return-post.html');
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
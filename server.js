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

//End points
//GET
server.get('home', (req, res) => {
    res.loadHtmlFile('home.html');
});

//GET
server.get('table-order/:id', (req, res) => {
    var optionalHtml = `${Restaurant.getAllMenuItemsHtml()}</select></div></form>`;
    optionalHtml += `    
    <script>
    var hidden = document.getElementById('hidden');
    var form = document.getElementById('form');

    form.addEventListener('submit', () => {
        hidden.value = window.location.pathname.split('/')[2];
    });
    </script>`;
    optionalHtml += '</section></body></html>';
    res.loadHtmlFile('table-order.html', optionalHtml);
});

//GET
server.get('order-cancel/:id', (req, res) => {
    var order = OrderManager.getOrderById(req.args[0]);
    OrderManager.orderChangeState(OrderState.Canceled, order);
    res.loadHtmlFile('order.html');
});

//GET
server.get('order-finish/:id', (req, res) => {
    var order = OrderManager.getOrderById(req.args[0]);
    OrderManager.orderChangeState(OrderState.Finished, order);
    res.loadHtmlFile('order.html');
});

//POST
server.post('order', (req, res) => {
    var order = OrderManager.createOrder();
    var tableNumber = req.bodyCollection.number;
    var table = Restaurant.getTableByNumber(tableNumber);
    var select = req.bodyCollection.select;
    if (Array.isArray(select)) {
        var items = [];
        select.forEach((el) => {
            items.push(Restaurant.getItemById(el));
        });   
        OrderManager.addItems(items, order);
    }
    else{
        OrderManager.addItem(Restaurant.getItemById(select), order);
    }
    TableManager.addOrder(order, table);
    res.loadHtmlFile('order.html');
});

//GET
server.get('tables/:id', (req, res) => {
    var table = Restaurant.getTableByNumber(req.args[0]);
    var optionalHtml = TableManager.getAllTableOrdersHtml(table);
    res.loadHtmlFile('table.html', optionalHtml);
});

//GET
server.get('tables', (req, res) => {
    var optionalHtml = `${Restaurant.getAllTablesInfoHtml()}</body></html>`;
    res.loadHtmlFile('tables.html', optionalHtml);
});

//GET
server.get('menu', (req, res) => {
    var optionalHtml = `${MenuManager.getMenuHtml(Restaurant.mainMenu)}</tbody></table></body></html>`;
    res.loadHtmlFile('menu.html', optionalHtml);
});

//GET
server.get('item-remove/:id', (req, res) => {
    res.loadHtmlFile('item-remove.html');
});

//POST
server.post('item-remove-post', (req, res) => {
    var reason = req.bodyCollection.reason;
    var id = req.bodyCollection.id;
    var item = Restaurant.getItemById(id);
    ItemManager.markRemoved(item, reason);
    res.loadHtmlFile('home.html');
});

//GET
server.get('item-update/:id', (req, res) => {
    var item = Restaurant.getItemById(req.args[0]);
    ItemManager.markReturned(item);
    res.loadHtmlFile('item-update.html');
});

//GET
server.get('item', (req, res) => {
    res.loadHtmlFile('item.html');
});

//POST
server.post('item-create', (req, res) => {
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
    res.loadHtmlFile('item-create.html');
});

server.run(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
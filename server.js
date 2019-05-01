//Server requirements
var restaurantServer = require('./WebServer/restaurantServer');
const PORT = 3000;
var server = new restaurantServer();

//Data requirements
var Restaurant = require('./Generator/auto-build');
var TableManager = require('./Managers/TableManager');
var MenuManager = require('./Managers/MenuManager');

//End points
server.get('home', (req, res) => {
    res.loadHtmlFile('home.html');
});

server.get('tables/:id', (req, res) => {
    var table = Restaurant.getTableByNumber(req.args[0]);
    var optionalHtml = TableManager.getAllTableOrdersHtml(table);
    res.loadHtmlFile('table.html', optionalHtml);
});

server.get('tables', (req, res) => {
    var optionalHtml = `${Restaurant.getAllTablesInfoHtml()}</body></html>`;
    res.loadHtmlFile('tables.html', optionalHtml);
});

server.get('menu', (req, res) => {
    var optionalHtml = `${MenuManager.getMenuHtml(Restaurant.mainMenu)}</body></html>`;
    res.loadHtmlFile('menu.html', optionalHtml);
});

server.run(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
var mysql      = require('mysql'),
	inquirer   = require('inquirer'),
	connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: '',
		database: 'Bamazon'
	});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
	runApp();
});

function runApp() {
	connection.query('SELECT * FROM products', function(err, res) {
		var itemID = [];

		if (err) throw err;

		for (var i = 0; i < res.length; i++) {
			console.log('Item ID: ' + res[i].item_id + '\n Product: ' + res[i].product_name + '\n Department: ' + res[i].department_name + '\n Price: ' + res[i].price + '\n Stock: ' + res[i].stock_quantity + '\n');

			itemID.push(res[i].item_id);
		};

		inquirer.prompt([
			{	
				type: 'input',
				name: 'itemID',
				message: 'Enter the "Item ID" to purchase:'
			},
			{
				type: 'input',
				name: 'quantity',
				message: 'How many would you like?'
			}
		])
		.then(function(userRes) {
			
			var id        = userRes.itemID,
				quantity  = parseInt(userRes.quantity),
				querySelc = 'SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?';
		
			connection.query(querySelc, {item_id: id}, function(err, data) {
				if (err) throw err;

				var name      = data[0].product_name,
					price     = data[0].price * quantity,
					inventory = data[0].stock_quantity - quantity,
					query     = 'UPDATE products SET ? WHERE ?';
			// console.log(name,price,inventory,quantity, query)
				if (data[0].stock_quantity >= quantity) {
					connection.query(query, [
						{
							stock_quantity: inventory
						},
						{
							item_id: id
						}
					], function(err) {
		
						if (err) throw err;
						console.log('Thank you for order!\n' + name + ' x' + quantity + '\n Total: $' + price);
					})
				} else {
					console.log('Out of Stock! Try again!')
				}
				connection.end();
			})

		})
	})
}
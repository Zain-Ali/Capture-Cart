 <?php

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/


// This will produce a fatel error if the file or database crashes 
require('../DBConnect/db.php'); 
// require_once

/**
* Get Products Function creates new database if it already does not exist on the server.
* SQL Queries are used to select list of all products from Database
* JASON_Encoding used to transfer data between server and client side application 
* Create new database if it doesn't exists
*/

function geOrders()
{
	$database = new DB();
	$bind = null;
	$sql = "SELECT * FROM Order";
	return json_encode($database->query($sql));
	// add (or update) the record to the database
	$rows = $DB -> query ($query -> $binds);
}

/**
* @ paramater: $ID Return single product by given ID using SQL query
* Get Product Function creates new database if it already does not exist on the server.
* JASON_Encoding used to transfer data between server and client side application 
*/

function getProduct($ID){
	$database = new DB();
	$bind = null;
	$sql = "SELECT * FROM Order WHERE OrderID = $ID";
	return json_encode($database->query($sql));
	// add (or update) the record to the database
	$rows = $DB -> query ($query -> $binds);
}

/**
* Delete Order Basket Function
* Create new database if it doesn't exists
* @orderID: delete the product using orderID. Order will be deleted by 
* specifying orderID
*/

function deleteOrder($orderID) {
	$database = new DB();
	$sql = "DELETE FROM Orders WHERE OrderID= $OrderID";
	$database->query($sql);
}

<?php

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/


// This will produce a fatel error if the file or database crashes 
require('DBConnect/db.php'); 

/**
* Get Products Function creates new database if it already does not exist on the server.
* SQL Queries are used to select list of all products from Database
* JASON_Encoding used to transfer data between server and client side application 
* Create new database if it doesn't exists
*/

function getProducts($cat = null)
{
	$database = new DB();
	$bind = null;
	$sql = "SELECT * FROM Products";
	if ($cat) {
		$cat = $database->query("SELECT categoryID from category where categoryName = '$cat'");
		$sql .= " WHERE categoryID = ".$cat[0]['categoryID'];
	}
	return json_encode($database->query($sql));
}

/**
* @ paramater: $ID Return single product by given ID using SQL query
* Get Product Function creates new database if it already does not exist on the server.
* JASON_Encoding used to transfer data between server and client side application 
*/

function getProduct($ID){
	$database = new DB();
	$bind = null;
	$sql = "SELECT * FROM Products WHERE ProductID = $ID";
	return json_encode($database->query($sql));
}

/**
* This function post the record to the database
* Receive record in JSON Formatted String from client side and decode it and convert the product into an object which can go onto the database
* The "php://input" allows the user to read raw POST data.
* INSERT all the required information on the the table and then database usign sql query
* strlen will return the length of given string which is assigned to be greater than 0
* foreach is used to provide an easy way to iterate over array
*/

function postProducts()
{
	$data = json_decode(file_get_contents("php://input"));	
	if (strlen($data->productName) > 0) {
		
		$sql = "INSERT INTO Products(ProductName, CategoryID, ProductDescription, ProductPrice, ProductStockLevel, ProductImage) VALUES (";
		foreach ($data as $key => $value) {
			$sql .=  ":".$key.", ";	
		}
		$sql = rtrim($sql, ", ");
		$sql .= ");";
		$dataItems = array();
		//Concatenation assignment
		// Joing entities together
		foreach ($data as $key => $value) {
			$dataItems[":".$key] = "".$value;
		}

		$database = new DB();
		$database->query($sql, $dataItems);
	}
}

/**
* Delete Product Function
* Create new database if it doesn't exists
* @productID: delete the product using productID. Product will be deleted by specifying productID
*/

function deleteProducts($productID) {
	$database = new DB();
	$sql = "DELETE FROM Products WHERE ProductID= $productID";
	$database->query($sql);
}


/**
* Update Product Function 
* Receive record in JASON Formatted String from client side and decode it and convert the product into an object which can go onto the database
* The "php://input" allows the user to read raw POST data.
* @parameter: ProductID: update the record/product by specifying produc id
* var_dump displays information about one or more expression (productName and productPrice)
* Create new database if it doesn't exists
*/

function updateProducts($ProductID) {
	$info = json_decode(file_get_contents("php://input"), true);
	$database = new DB();
	var_dump(file_get_contents("php://input"));
	$sql = "UPDATE Products SET ProductName = '" .$info['ProductName'] . "', Price = '".$info['ProductPrice']. "' WHERE ProductID = $ProductID";
	$a = $database->pdo()->prepare($sql);
	$a->execute();
}



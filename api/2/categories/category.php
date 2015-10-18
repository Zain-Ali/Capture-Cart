 <?php

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

require('../DBConnect/db.php');

/**
* JASON_Encoding used to transfer data between server and client side application 
*/

function getCategories() // this is for all categories, change it to categories from category later
{
	$database = new DB();
	$sql = "SELECT * FROM Category";
	return json_encode($database->query($sql));
}

/**
* @ paramater: $ID Return single category by given ID using SQL query
* JASON_Encoding used to transfer data between server and client side application 
*/

function getCategory($ID) {
	$database = new DB();
	$bind = null;
	$sql = "SELECT * FROM Category WHERE CategoryID = $ID";
	return json_encode($database->query($sql));
	// add (or update) the record to the database
	$rows = $DB -> query ($query -> $binds);
}


/**
* This function post the record to the database
* Receive record in JSON Formatted String from client side and decode it and convert the * category into an object which can go onto the database
* The "php://input" allows the user to read raw POST data.
* INSERT all the required information on the the table and then database usign sql query
* strlen will return the length of given string which is assigned to be greater than 0
* foreach is used to provide an easy way to iterate over array
*/
function postCategory()
{
	$data = json_decode(file_get_contents("php://input"));	

	if (strlen($data->categoryName) > 0) {

		$sql = "INSERT INTO Category(CategoryName) VALUES (";
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
* Delete Category Function
* Create new database if it doesn't exists
* @CategoryID: delete the product using categoryID. Category will be deleted by 
* specifying categoryID
*/
function deleteCategory($CategoryID) {
	$database = new DB();
	$sql = "DELETE FROM Category WHERE CategoryID= $CategoryID";
	$database->query($sql);
}


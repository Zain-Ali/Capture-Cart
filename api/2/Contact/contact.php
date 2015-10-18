<?php

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

require('../DBConnect/db.php'); 

/**
* This function post the record to the database
* Receive record in JSON Formatted String from client side and decode it and convert the product into an object which can go onto the database
* The "php://input" allows the user to read raw POST data.
* INSERT all the required information on the the table and then database usign sql query
* strlen will return the length of given string which is assigned to be greater than 0
* foreach is used to provide an easy way to iterate over array
*/

function postContactQueries()
{
	$data = json_decode(file_get_contents("php://input"));	

	if (strlen($data->Name) > 0) {

		$sql = "INSERT INTO Contact(Name, Email, ContactNo, Query) VALUES (";
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
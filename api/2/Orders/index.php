<?php

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

// This will produce a fatel error if there is an error on products.php or database crashes 
 require 'orders.php';


/**
* A Resoruce List for Products to include HTTP Verbs
* Switch Statement used for HTTP Verbs (GET, POST, DELETE, and PATCH)
* Server Request_Method is an array which contains information of paths and locations
* Routing for Products Starts Here
*/

// Remove white space (trim) and check if variable is set and not empty(isset) 
$pathParts = trim(isset($_SERVER['PATH_INFO'])? $_SERVER['PATH_INFO'] : '/' , '/');
$pathParts = explode('/', $pathParts);
		switch ($_SERVER['REQUEST_METHOD']) 
		{
			// Gets List of all products or single product using GET Method
			case 'GET':
				if (empty($pathParts[1])){
					echo getOrders();
				}else{
					echo getOrder($pathParts[1]);
				}
				break;

			// Create product on database using POST and view it using GET Method
			case 'POST':
				postOrders(json_decode(file_get_contents('php://input')));
				break;

			// Delete requrested product from database using DELETE Method
			case 'DELETE':
				if (empty($pathParts[1])) {
					echo("you can delete everthing!!");
				}else{
					 deleteOrders($pathParts[1]);
				}
				break;
			
			// Allow the user to Edit/Update Products on Database
			case 'PATCH':
			if (isset($pathParts[1])) {
				updateOrders($pathParts[1]);
			}
		}

		// End of Switch Statement

function postOrders($postBody)
{
	//var_dump($postBody);
	foreach ($postBody as $key => $value) {
		echo $value;
		$db = new DB();
		$args = array('quantity' => 1,
						'productId' => $value);
		$db -> query("INSERT INTO `Order` VALUES ('placeholder' ,:quantity , :productId)", $args);
// 
		// 
	}
}

	// $postBody is an array of product IDs
	// insert a new order along with the product IDs

<?php

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

// This will produce a fatel error if there is an error on products.php or database crashes 
require 'products.php';


/**
* A Resoruce List for Products to include HTTP Verbs
* Switch Statement used for HTTP Verbs (GET, POST, DELETE, and PATCH)
* Server Request_Method is an array which contains information of paths and locations
* Routing for Products Starts Here
*/

// Remove white space (trim) and check if variable is set and not empty(isset) 
$pathParts = trim(isset($_SERVER['PATH_INFO'])? $_SERVER['PATH_INFO'] : '/' , '/');
$pathParts = explode('/', $pathParts); // that gets the path
switch ($pathParts[0]) {		
		case 'products':
		switch ($_SERVER['REQUEST_METHOD']) 
		{
			// Gets List of all products or single product using GET Method
			case 'GET':
				if (empty($pathParts[1])){
					if (!empty($_GET['category'])) {
						echo getProducts($_GET['category']);
					} else {
						echo getProducts();
					}
				}else{
					echo getProduct($pathParts[1]);
				}
				break;

			// Create product on database using POST and view it using GET Method
			case 'POST':
				postProducts();
				break;

			// Delete requrested product from database using DELETE Method
			case 'DELETE':
				if (empty($pathParts[1])) {
					echo("you can delete everthing!!");
				}else{
					 deleteProducts($pathParts[1]);
				}
				break;
			
			// Allow the user to Edit/Update Products on Database
			case 'PATCH':
			if (isset($pathParts[1])) {
				updateProducts($pathParts[1]);
			}
		}
		break;
		// End of Switch Statement
}



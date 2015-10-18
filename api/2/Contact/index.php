<?php

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

// This will produce a fatel error if there is an error on products.php or database crashes 
require 'contact.php';


/**
* A Resoruce List for Products to include HTTP Verbs
* Switch Statement used for HTTP Verbs (GET, POST, DELETE, and PATCH)
* Server Request_Method is an array which contains information of paths and locations
* Routing for Products Starts Here
*/

// Remove white space (trim) and check if variable is set and not empty(isset) 
$pathParts = trim(isset($_SERVER['PATH_INFO'])? $_SERVER['PATH_INFO'] : '/' , '/');
$pathParts = explode('/', $pathParts);
switch ($pathParts[0]) {		
		case 'contact':
		switch ($_SERVER['REQUEST_METHOD']) 
		{

			// Create product on database using POST and view it using GET Method
			case 'POST':
				postContactQueries();
				break;

		}
		break;
}



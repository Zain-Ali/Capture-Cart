<?php
require 'category.php';

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

/**
* A Resoruce List for Category to include HTTP Verbs
* Switch Statement used for HTTP Verbs (GET, POST, DELETE, and PATCH)
* Server Request_Method is an array which contains information of paths and locations
* Routing for Products Starts Here
*/

$pathParts = trim(isset($_SERVER['PATH_INFO'])? $_SERVER['PATH_INFO'] : '/' , '/');
$pathParts = explode('/', $pathParts);

switch ($pathParts[0]) { //2		
		case 'category':
		switch ($_SERVER['REQUEST_METHOD']) 
		{
			case 'GET':
				if (empty($pathParts[1])){
					echo getCategories();
				}else{
					echo getCategory($pathParts[1]);
				}
				break;

			case 'POST':
				postCategory();
				break;

			case 'DELETE':
				if (empty($pathParts[1])) {
					echo("you can delete everthing!!");
				}else{
					 deleteCategories($pathParts[1]);
				}
				break;

			case 'UPDATE':
			if (isset($pathParts[1])) {
				updateCategory($pathParts[1], $_POST);
			}
		}
		break;
} //2



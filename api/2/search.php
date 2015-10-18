<?php

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/
 require('DBConnect/db.php'); 

class products {
	public $ProductID;
	public $CategoryID;
	public $ProductName;
	public $ProductDescription;
	public $ProductPrice;
	public $ProductStockLevel;
	public $ProductImage;
}

$search = $_GET["input"];

try {
	$database = new DB();
	$bind = null;
	$sql = "SELECT * FROM Products WHERE ProductName LIKE :searchterm";
	$a = $database->pdo()->prepare($sql);
	$a->execute(array(":searchterm" => "%" . $search . "%"));
	$rows = $a->fetchAll(PDO::FETCH_CLASS, "products");
	foreach($rows as $row) {
		print "<section class='layout'><p>ProductID: ".$row->ProductID ."</p><h4> ".$row->ProductName."</h4><p class='writeUp'>".$row->ProductDescription."</p><p class='writeUp'>£".$row->ProductPrice."</p><p class='writeUp'>Stock Level:".$row->ProductStockLevel."</p><img class='productImage' src=../images/productImages/".$row->ProductImage."><button id=".$row->ProductID."> Add To Cart </button></section>";
	}

} 
catch (PDOException $e) 
{
	echo $e;
}

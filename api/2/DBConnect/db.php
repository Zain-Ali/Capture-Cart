
<?php 

/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/


include ('connect.php');

/**
* Database Class
* include statement for specified file in directory
* local variable in constructor "$pdo"
*/

class DB 
{
	private $pdo;

	/**
	* These functions has been taken from "Linbeta"
	* https://github.com/portsoc/linbeta/blob/master/inc/db.php
	* Some function might be modified accordingly.
	*/

	/**
	* The constructor function is used to connect to a MySQl engine
	* using HOST, Name, User and Passowrd.
	* from connect.php file.
	*/
	public function __construct()
	{
		// This will connect the database to the server
	    $dsn = "mysql:" . HOST . ";dbname=".DBNAME.";";
	    $option = array(
	    	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
	    	PDO::ATTR_PERSISTENT => true
	    );
	    // Give error if the database doesn't exist or fail to load
	    try {
	        $this->pdo = new PDO($dsn, USER, PASS, $option);
	        $this->pdo->query("use ".DBNAME);
	    } catch (PDOException $failure) {
	         DB::throwException("Connect failed during construct");
	    }
	}

	/** 
	* This function deals with database querys and database excution .
	* @ parameters: $query will run and excute with database
	* @ parameters: $bindings The data vaule to be bind when the query will run 
	*/

	public function query($query, $bindings = null)
	{
        if (isset($bindings)) {
            $result =$this->pdo->prepare($query);
            $result->execute($bindings);
        } else {
            $result =$this->pdo->query($query);
        }
        // Fetches All result from row with PDOStatement
        if (strpos($query, 'SELECT') !== false) {
            return $result->fetchAll(PDO::FETCH_ASSOC);
        }
        // return result if exists and rowCount;
        return $result->rowCount();
	}

	/**
	* return PDO
	*/
	public function pdo()
	{
		return $this->pdo;
	}

}
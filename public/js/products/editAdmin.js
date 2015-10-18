/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/


/**
* Edit Products Function allow the Admin to Update or Edit Products/Records
* Admin are allowed to update productName and productPrice
* The location.search reutnr querystring and split method is used to split the strings into an array of substrings
* New XMLHttpRequest is used to fetch the data from database
* Use the PATCH HTTP Verb and also uses path to product.php to change the Product Info by specifying productID
* JASON.stringfy us used to coverts the value into JASON String
*/

function editProducts() {
	var productName = document.getElementById('productName').value;
	var productPrice = document.getElementById('productPrice').value;
	var ProductID  = location.search.split(/\?/)[1];
	var data = {'ProductName': productName, 'ProductPrice': productPrice}; 
	xhr = new XMLHttpRequest();
	xhr.open("PATCH", "../../../api/2/products/"+ProductID, false);
	xhr.send(JSON.stringify(data));
}

/**
* This method is used to load the submit function
* Once the user have clickec on Submit(ID) button, it will 
* response to it and change the information accordingly 
*/
window.addEventListener("load", function(){
	submit = document.getElementById('submit');
	submit.addEventListener("click", editProducts);
});

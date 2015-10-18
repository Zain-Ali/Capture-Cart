/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/


/**
* Post Products Function
* The submit ID is exported from admin folder to allow the admin to create new products
* Once user click submit it sends the register and sends the request to specified URL
* If successful then it post and create the new products onto the database
* If the request fails the returns the error and status onto the console
* The callback function get excuted
*/

function postProducts() {
				var submit = document.getElementById('submit');

				function successXHR () { this.callback.apply(this, this.arguments); }

				function errorXHR () { console.error(this.statusText); }

				function productsFromAPI (method, url, Productsdata, callback) {
				console.log(Productsdata);
				var register = new XMLHttpRequest();
				register.callback = callback;
				register.arguments = Array.prototype.slice.call(arguments, 3);
				register.onload = successXHR;
				register.onerror = errorXHR;
				register.open(method, "/687776"+url, true);
				register.send(Productsdata);
				}

				// put on the page and it does all the ajax request for all of the pages
				submit.addEventListener('click', function(event) {
					console.log(event);
					event.preventDefault();

					var Productsdata = {};

					Productsdata["productName"] = document.getElementById('productName').value;
					Productsdata["categoryID"] = document.getElementById('categoryID').value;
					Productsdata["productDescripton"] = document.getElementById('productDescripton').value;
					Productsdata["productPrice"] = document.getElementById('productPrice').value;
					Productsdata["productStock"] = document.getElementById('productStock').value;
					Productsdata["productImage"] = document.getElementById('productImage').files[0].name; //value;

					productsFromAPI("POST", "/api/2/products", JSON.stringify(Productsdata), function(){
						console.log(this.responseText);
					});
				});
}

//check the status and go back to post the products
//attach and load event and go back to get Produts from postProducts function 
window.addEventListener("load", postProducts);



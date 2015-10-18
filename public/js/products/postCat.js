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

function postCategory() {
				var submit = document.getElementById('submit');

				function successXHR () { this.callback.apply(this, this.arguments); }

				function errorXHR () { console.error(this.statusText); }

				function productsFromAPI (method, url, Catdata, callback) {
				console.log(Catdata);
				var register = new XMLHttpRequest();
				register.callback = callback;
				register.arguments = Array.prototype.slice.call(arguments, 3);
				register.onload = successXHR;
				register.onerror = errorXHR;
				register.open(method, "/687776"+url, true);
				register.send(Catdata);
				}

				// put on the page and it does all the ajax request for all of the pages
				submitCat.addEventListener('click', function(event) {
					console.log(event);
					event.preventDefault();

					var Catdata = {};

					Catdata["categoryName"] = document.getElementById('categoryName').value;
							
					console.log(Catdata);
					productsFromAPI("POST", "/api/2/categories/category", JSON.stringify(Catdata), function(){
						console.log(this.responseText);
					});
				});
}
window.addEventListener("load", postCategory);
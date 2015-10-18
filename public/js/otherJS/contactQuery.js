/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

/**
* Post Products Function
* The submit ID is exported from admin folder to allow the admin to create new Query
* Once user click submit it sends the register and sends the request to specified URL
* If successful then it post and create the new Query onto the database
* If the request fails the returns the error and status onto the console
* The callback function get excuted
*/

function postContactQueries() {
				var submit = document.getElementById('submit');

				function successXHR () { this.callback.apply(this, this.arguments); }

				function errorXHR () { console.error(this.statusText); }

				function queryFromAPI (method, sURL, Contactdata, callback) {
				console.log(Contactdata);
				var register = new XMLHttpRequest();
				register.callback = callback;
				register.arguments = Array.prototype.slice.call(arguments, 3);
				register.onload = successXHR;
				register.onerror = errorXHR;
				register.open(method, "/687776"+sURL, true);
				register.send(Contactdata);
				}

				// put on the page and it does all the ajax request for all of the pages
				submit.addEventListener('click',  function(event) {
					console.log(event);
					event.preventDefault();

					var Contactdata = {};

					Contactdata["Name"] = document.getElementById('Name').value;
					Contactdata["email"] = document.getElementById('email').value;
					Contactdata["contact"] = document.getElementById('contact').value;
					Contactdata["query"] = document.getElementById('query').value;
					

					console.log(Contactdata);
					queryFromAPI("POST", "/api/2/contact/contact", JSON.stringify(Contactdata), function(){
						console.log(this.responseText);
					});
				});
}

//check the status and go back to post the Query
//attach and load event and go back to get Query from postProducts function 
window.addEventListener("load", postContactQueries);


/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

/**
* Search Function
* window.setTimeout is so it can wait for 1 milie-second after userinput to allow all of the words to be entered
* grabs the id from products html page (search_text)
* grabs the ajax Get request from server side search.php to allow the user to search for the products.
* grabs the id and place into innerHTMl and give the response to user input
*/

function search() {
	window.setTimeout(
		function() {
		var search = document.getElementById("search_text").value;
		AjaxGet("http://localhost/687776/api/2/search.php?input="+search, function(response) 
			{
				document.getElementById("viewproductByCategory").innerHTML = response;
			});
	}, 1);
}

/**
* This code has been taken from Kit Lester Worksheet. However, it has been modified accordingly
* Ajax get function send the httpRequestion and uses the URL to callback the function.
* 
*/
function AjaxGet(URL, callback) {
    var ajaxObject = new XMLHttpRequest();
    ajaxObject.open("GET", URL, true); //True is asynchronous
    ajaxObject.onreadystatechange = function()
        { if (ajaxObject.status == 200)
            if (ajaxObject.readyState == 4)
                callback(ajaxObject.responseText);
        };
    ajaxObject.send(null);
}
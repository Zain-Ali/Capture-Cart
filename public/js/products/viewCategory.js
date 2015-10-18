/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/


var xhr = checkObject();
var findCategories;

/**
* Function checkObject checks if the browser is compatible
* It checks what XML to run depending on browser type
* All Modern browsers support the XMLHttpRequest object
* However, IE5 and IE6 support ActiveXObject.
*/

function checkObject()
{
	var xhr;

	if(window.XMLHttpRequest)
	{
		xhr = new XMLHttpRequest();
	}
	else
	{
		xhr = new ActiveXObject("MICROSOFT.XMLHTTP");
	}
	return xhr;

}

/**
* Function grabProducts will interact with GET Method on products.php
* xhr.open specifies the type of the request and the URL for products.php
* xhr.onreadystatechange storea a function/gets a response and get called automatically each time
* xhr.send send the request to the server, however, we are not sending anything, 
* just getting products using URL
* log the call to console and check the event
* Allow Admin to view products on their browser and Allow them to add, edit, create new products and update and delete products
*/

function grabCategories()
{
	if(xhr != null)
	{
		try
		{
			xhr.open("GET", "../../../api/2/categories/category", false);
			xhr.onreadystatechange = getResponse;
			xhr.send(null);
		}
		catch(e)
		{
			console.log(e.toString());
		}
	}
}


/**
* Function delete Products is use to send the request and delete product
* @ parameter: ProductID: sends the request to the server by specifying product ID
* xhr.onreadystatechange storea a function/gets a response and get called automatically each time
*/

function deleteProducts(CategoryID)
{
	if(xhr != null)
	{
		try
		{
			xhr.open("DELETE", "../../api/2/categories/category/"+CategoryID, false);
			xhr.onreadystatechange = getResponse;
			xhr.send(null);
		}
		catch(e)
		{
			console.log(e.toString());
		}
	}
}

/**
* Function getResponse is used to check the status and go back to grabCategories from web server and database
* check 200 status and if okay then proceede  with request
* JASON.parese(responseText) is to read data from a web server and read using XMLHTTP
* for loop is used to get response of product for getting and deleteing the product using CategoryID
*/

function getResponse()
{
	if (xhr.status == 200 && xhr.statusText == 'OK')
	{
		console.log("request verified");
		findCategories = JSON.parse(xhr.responseText);
			console.log(findCategories);
			for(var i = 0; i < findCategories.length; ++i)
			{
				console.log(findCategories[i].CategoryID);
 				document.getElementById("adminCategory").innerHTML += "<section class='adminCategory1'><p>CategoryID: "+findCategories[i].CategoryID+"</p><p> Name: "+findCategories[i].CategoryName+"</p><button class='delete' id=" + findCategories[i].CategoryID+">Delete</button></section>";
			}
	}																								

	delbtns = document.getElementsByClassName('delete');

	for(a = 0; a < delbtns.length; a++)
	{

		/**
		* Delete the Category by specifying CategoryID by using eventListener on click
		* grabs delete button from response function and delete the product
		* Delete category from database by sending the request to the web server using URL on xhr.open method
		*/

		(function() {
			var id = delbtns[a].id;
			delbtns[a].addEventListener('click', 
			function(){xhra = new XMLHttpRequest();xhra.open('DELETE', '/687776/api/2/categories/category/'+ id);xhra.send();});
		}());
	}	
}

//attach and load event and go back to get Produts from grabProducts function 
window.addEventListener("load", grabCategories);





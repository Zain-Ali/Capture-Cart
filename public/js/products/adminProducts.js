/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

var xhr = checkObject();
var findProducts;

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

function grabProducts()
{
	if(xhr != null)
	{
		try
		{
			xhr.open("GET", "../../../api/2/products", false);
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

function deleteProducts(ProductID)
{
	if(xhr != null)
	{
		try
		{
			xhr.open("DELETE", "../../api/2/products/"+ProductID, false);
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
* Function getResponse is used to check the status and go back to grabProducts from web server and database
* check 200 status and if okay then proceede  with request
* JSON.parese(responseText) is to read data from a web server and read using XMLHTTP
* for loop is used to get response of product for getting and deleteing the product using ProductID
*/

function getResponse()
{
	if (xhr.status == 200 && xhr.statusText == 'OK')
	{
		console.log("request verified");
		findProducts = JSON.parse(xhr.responseText);
			console.log(findProducts);
			for(var i = 0; i < findProducts.length; ++i)
			{
				console.log(findProducts[i].ProductID);
				document.getElementById("article").innerHTML += "<section class='layout'><p>ProductID: "+findProducts[i].ProductID+"</p><h4> Product: "+findProducts[i].ProductName+"</h4><p class='writeUp'> Description: "+findProducts[i].ProductDescription+"</p><p class='writeUp'>£"+findProducts[i].ProductPrice+"</p>"+"<p class='writeUp'>Stock Level: "+findProducts[i].ProductStockLevel+"</p><img class='productImage' src=../../images/productImages/"+findProducts[i].ProductImage+"><button class='delete' id=" + findProducts[i].ProductID+">Delete</button>"+"<button class='edit' id=" + findProducts[i].ProductID+"> Edit </button></section>";

			}
	}																								

	delbtns = document.getElementsByClassName('delete');

	for(a = 0; a < delbtns.length; a++)
	{

		/**
		* Delete the Product by specifying ProductID by using eventListener on click
		* grabs delete button from response function and delete the product
		* Delete product from database by sending the request to the web server using URL on xhr.open method
		*/

		(function() {
			var id = delbtns[a].id;
			delbtns[a].addEventListener('click', 
			function(){xhra = new XMLHttpRequest();xhra.open('DELETE', '/687776/api/2/products/'+ id);xhra.send();});
		}());
	}	

		editButton = document.getElementsByClassName('edit');
		for(a = 0; a < editButton.length; a++)
		{
		/**
		* Edit/Update the Product by specifying ProductID by using eventListener on click
		* window.locaiton will change the location of file when user click on Edit button for certain product.
		* 
		*/
		(function() {
			var id = editButton[a].id;
			editButton[a].addEventListener('click', 
			function() {	
				window.location = '/687776/public/html/Admin/editProducts?'+id;
			})
		}());
	}

}

/**
* Function grabProductCategory will interact with GET Method on products.php
* xhr.open specifies the type of the request and the URL for products.php
* xhr.onreadystatechange storea a function/gets a response and get called automatically each time
* xhr.send send the request to the server, however, we are not sending anything, 
* just getting products using URL
* log the call to console and check the event
* Grabs the product by Category
*/
function grabProductCategories()
{
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost/687776/api/2/categories/category', true);
	xhr.send();

	xhr.onload = function() {
		var categ = JSON.parse(xhr.response);
		var cats = document.getElementById("cats");

		categ.forEach(
			
			function(e) {
			var catElement = document.createElement('div');
			catElement.innerHTML = e.CategoryName;
			cats.appendChild(catElement);

			catElement.addEventListener('click', 
				
				function(e) {
				var xhr = new XMLHttpRequest();
				xhr.open("GET", "http://localhost/687776/api/2/products?category="+e.target.innerHTML, false);
				xhr.send(null);
				document.getElementById("viewproductByCategory").innerHTML = '';

				findProducts = JSON.parse(xhr.responseText);
				for(var i = 0; i < findProducts.length; ++i)
				{
					document.getElementById("viewproductByCategory").innerHTML += "<section class='layout'><p>ProductID: "+findProducts[i].ProductID+"</p><h4> "+findProducts[i].ProductName+"</h4><p class='writeUp'>"+findProducts[i].ProductDescription+"</p><p class='writeUp'>£"+findProducts[i].ProductPrice+"</p>"+"<p class='writeUp'>Stock Level:"+findProducts[i].ProductStockLevel+"</p><img class='productImage' src=../images/productImages/"+findProducts[i].ProductImage+"><button id=" + findProducts[i].ProductID+"> Add To Cart </button>";
				}
			})
		})
	}
}

//attach and load event and go back to get Produts from grabProducts function 
window.addEventListener("load", grabProducts);
window.addEventListener("load", grabProductCategories);





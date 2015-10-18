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
*/
function grabProducts()
{
	if(xhr != null)
	{
		try
		{
			xhr.open("GET", "../../api/2/products", false);
			xhr.onreadystatechange = getResponse;
			xhr.send(null); // the post form will go here
		}
		catch(e)
		{
			console.log(e.toString());
		}
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
				xhr.open("GET", "../../api/2/products?category="+e.target.innerHTML, false);
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

/**
* Get Response checks the status.
* The json parse method will pass the parse string as JSON
* It check if the product exists in grabProducts and grabProductsCategory
* then creates the products using innerHTML on web page
* There is also a add to cart button which will add the product to the shopping cart on product Page
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
			console.log(JSON.stringify(findProducts));
			for(var i = 0; i < findProducts.length; ++i)
			{
				document.getElementById("viewproductByCategory").innerHTML += "<section class='layout'><p>ProductID: "+findProducts[i].ProductID+"</p><h4> Product "+findProducts[i].ProductName+"</h4><p class='writeUp'> Description: "+findProducts[i].ProductDescription+"</p><p class='writeUp'>£"+findProducts[i].ProductPrice+"</p>"+"<p class='writeUp'>Stock Level: "+findProducts[i].ProductStockLevel+"</p><img class='productImage' src=../images/productImages/"+findProducts[i].ProductImage+"><button id=" + findProducts[i].ProductID+"> Add To Cart </button>";
			}
		
		var buttons = document.getElementsByTagName('button');
		for (var i = 0; i < buttons.length; i++) {			// for all buttons
			if (buttons[i].id !== 'search_button' && buttons[i].id !== 'checkOut') {			// except search
				buttons[i].addEventListener('click', addCart);	// add click eventHandler calling addCart
			}
		}
	}
}

//check the status and go back to grabProduct Function
window.addEventListener("load", grabProducts);
window.addEventListener("load", grabProductCategories);




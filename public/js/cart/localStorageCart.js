/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester.
* 2014 && 2015 
*/

var shoppingCartItems;
var basket = [];
var productToStore;

/**
* @parameter (e (event to occur))
* add to cart function, push the element by id
* then add it to cart
*  add the shopping cart to local storage (recommend)
* CustomEvents used to create new events everytime addToCart is pressed using EventName(productID)
*/

function addCart(e) {
	basket.push(e.toElement.id);
	productToStore = JSON.stringify(basket);
	localStorage['basket'] = productToStore;
	document.dispatchEvent(new CustomEvent('cartChanged'));
}

/**
* @parameter: productId used to find products
* Uses forloop to find products
* if the products exits (which customer ask for) then return the product to cart
*/

function findProduct(productId){


	for (var i = 0; i < findProducts.length; i++) {
		if (findProducts[i].ProductID === productId){
			return(findProducts[i]);	
		}
	}
}

document.addEventListener('cartChanged', displayCart);


/**
* Function is used to display cart on screen and add it to localstorage in console.
* Return the 
*/
function displayCart() {
	console.log('@displayCart : localStorageCart');
	productToStore = JSON.parse(localStorage['basket']);
	var basketElement = document.getElementById("basket");
	basketElement.innerHTML = ''; // inside innerHTML and empty string (it removes the previous contents of the list)
	console.log(productToStore);
	for (var i = 0; i < productToStore.length; i++) {
		var currentProduct = findProduct(productToStore[i]);

		basketElement.innerHTML += "<p> ID: "+currentProduct.ProductID+"</p><h4>Name: "+currentProduct.ProductName+"</h4><p>Price: £"+currentProduct.ProductPrice+"</p><button class='delete' id=" + findProducts[i].ProductID+">Delete</button>";
	}
		delbtnsCart = document.getElementsByClassName('delete');

	for(a = 0; a < delbtnsCart.length; a++)
	{

		/**
		* Delete the Product by specifying ProductID by using eventListener on click
		* grabs delete button from response function and delete the product
		* Delete product from database by sending the request to the web server using URL on xhr.open method
		*/

		(function() {
			var id = delbtnsCart[a].id;
			delbtnsCart[a].addEventListener('click', 
			function(){
				xhra = new XMLHttpRequest();
				xhra.open('DELETE', '/687776/api/2/	orders/'+ id);
				xhra.send();});
		}());
	}

}

window.addEventListener('load', 

		/**
		* Once the customer have added the products to cart, and
		* when they click checkout button
		* it will post the order to database 
		*/
	function() {
	var checkOut = document.getElementById('checkOut');	

	checkOut.addEventListener('click', function(e) {

		xhr = new XMLHttpRequest();
		xhr.open('POST', '/687776/api/2/orders/index.php', true);
		xhr.send(localStorage['basket']);
		xhr.onload = function () {
			console.log(xhr.response);
		}
	});
});

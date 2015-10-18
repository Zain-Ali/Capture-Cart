/**
* Author: UP687776 
* Web Script Programming
* Rich Boakes && Kit Lester
* 2014 && 2015 
*/

//Unfinished Drag and Drop

var drag;
var drop;
var xhrSendData;

var registerDragListerners = function (product) {
	product.addEventLisnter("dragover", 
		function(e) 
		{e.preventDefault();}
		);

	target.addEventLisnter("drop",
		function(e) {e.preventDefault(); 
				e.preventDefault();
				upload(e.dataTransfer.files);
			}
		)
};

xhrSendData = function (method, sURL, drag, callback, )

//window.addEventLisnter("load" );
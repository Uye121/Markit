'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $('.btn').click(search);
}

function search(e) {
    //e.preventDefault();

	console.log("test");
    var word = document.getElementById('txtSearch').value;
}

function showResult(result) {
	var projectHTML = '<a href="#" class="detailsImage">' +
	'<img src="' + result['product_image_urls'] + '" class="img"></a>' +
	'<p>' + result['name'] +
	'</p>' + result['description'];
}
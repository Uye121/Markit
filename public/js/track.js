'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".loading_image").click(function(e) {
		console.log("stuff");
		ga("send", "event", 'logo', 'click');
    });
    
    $(".login").click(function(e) {
        ga("send", "event", 'login', 'click');
    });

    $(".button").click(function(e) {
        ga("send", "event", 'enterLogin', 'click');
    });

    $(".facebookLogin").click(function(e) {
        ga("send", "event", 'fblogin', 'click');
    });
}
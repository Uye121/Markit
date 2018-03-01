'use strict';

function track() {
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
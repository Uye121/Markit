'use strict';

function track() {
	// $(".loading_image").click(function(e) {
	// 	console.log("stuff");
	// 	ga("send", "event", 'logo', 'click');
    // });
    
    // $(".login").click(function(e) {
    //     ga("send", "event", 'login', 'click');
    // });

    // $(".button").click(function(e) {
    //     ga("send", "event", 'enterLogin', 'click');
    // });

    // $(".facebookLogin").click(function(e) {
    //     ga("send", "event", 'fblogin', 'click');
    // });

    console.log("start tracking...");
    $(".form-control").click(function() {
        console.log("tap form");
        ga("send", "event", 'tap form', 'click');
    });

    $(".btn #submitBtn").click(function() {
        console.log("submit barcode");
        ga("send", "event", 'submit barcode', 'click');
    });

    $(".scan_btn").click(function() {
        console.log("start scan");
        ga("send", "event", 'start scan', 'click');
    });
}
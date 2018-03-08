'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.login').hide();

    $('.loading_image').click(fade);

    setTimeout(function(){$('.loading_image').fadeOut(1000, function(){
        $('.login').show();
    });}, 1500);

    $('#InputField').focus(function(){
    	$(this).css('background', '#F48058')
    });
    $('#InputField').blur(function(){
    	$(this).css('background', 'white')
    });

    $('.name').click(function() {
        var projName = $(this).closest('.name').attr('id');
        var concat = '.' +projName;
        $(concat).toggle();
    });

    $('#submitBtn').click(function(e){
        e.preventDefault();
        $('#brs').hide();
        console.log("hello word");
    });

    // Start A/B tracking after animation
    track();
}

function fade(e) {
    e.preventDefault();
	$('.loading_image').fadeOut(1000, function(){
		$('.login').show();
	});
}

			
			
			

			

			
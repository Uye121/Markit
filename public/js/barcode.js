'use strict';

 $(function() {
	var walmartAPI = 'http://api.walmartlabs.com/v1/items?apiKey=s4wxvhdxmf7m5ktwxjm6hxr8&upc=037000951834';
	// Create the QuaggaJS config object for the live stream
	var liveStreamConfig = {
			inputStream: {
				type : "LiveStream",
				constraints: {
					width: {min: 640},
					height: {min: 480},
					aspectRatio: {min: 1, max: 100},
					facingMode: "environment" // or "user" for the front camera
				}
			},
			locator: {
				patchSize: "medium",
				halfSample: true
			},
			numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
			decoder: {
				"readers":[
					// {"format":"ean_reader","config":{}}
					"code_128_reader", "ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader", "code_93_reader"
				]
			},
			locate: true
		};
	// The fallback to the file API requires a different inputStream option. 
	// The rest is the same 
	var fileConfig = $.extend(
			{}, 
			liveStreamConfig,
			{
				inputStream: {
					size: 800
				}
			}
		);
	// Start the live stream scanner when the modal opens
	$('#livestream_scanner').on('shown.bs.modal', function (e) {
		Quagga.init(
			liveStreamConfig, 
			function(err) {
				if (err) {
					$('#livestream_scanner .modal-body .error').html('<div class="alert alert-danger"><strong><i class="fa fa-exclamation-triangle"></i> '+err.name+'</strong>: '+err.message+'</div>');
					Quagga.stop();
					return;
				}
				Quagga.start();
			}
		);
    });
	
	// Make sure, QuaggaJS draws frames an lines around possible 
	// barcodes on the live stream
	Quagga.onProcessed(function(result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;
 
		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
				});
			}
 
			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
			}
 
			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
			}
		}
	});
	
	// Once a barcode had been read successfully, stop quagga and 
	// close the modal after a second to let the user notice where 
	// the barcode had actually been found.
	Quagga.onDetected(function(result) {    		
		if (result.codeResult.code){
			$('#scanner_input').val(result.codeResult.code);
			//$.get(walmartAPI, getProduct);
			$('#scanner_input').val("036000291452");
			//document.getElementById('upc_api').href = "http://api.walmartlabs.com/v1/items?apiKey=s4wxvhdxmf7m5ktwxjm6hxr8&upc=" + result.codeResult.code;
			Quagga.stop();	
			setTimeout(function(){ $('#livestream_scanner').modal('hide'); }, 1000);			
		}
	});
    
	// Stop quagga in any case, when the modal is closed
    $('#livestream_scanner').on('hide.bs.modal', function(){
    	if (Quagga){
    		Quagga.stop();	
    	}
    });
	
	// Call Quagga.decodeSingle() for every file selected in the 
	// file input
	$("#livestream_scanner input:file").on("change", function(e) {
		if (e.target.files && e.target.files.length) {
			Quagga.decodeSingle($.extend({}, fileConfig, {src: URL.createObjectURL(e.target.files[0])}), function(result) {
				// TODO fix the problem of result being undefined.
				// Either display an error message or do something else.
				alert(result.codeResult.code);
			});
		}
	});
})

var modal = document.getElementById('modal');

function getProduct(code) {
	var productHTML = '<a href="#" class="productDetail">' +
	'<img src="' + code['thumbnailImage'] + '" class="img"></a>' +
	'</p>' + code['longDescription'];

	/*
	console.log(code);

	var productHTML = '<a href="#" class="productDetail">' +
	'<img src="' + code['thumbnailImage'] + '" class="img"></a>' +
	'</p>' + code['longDescription'];

	$('.product').html(productHTML);*/
}

// $('#upc_api').click(function(e) {
// 	document.getElementById('upc_api').href = "http://api.walmartlabs.com/v1/items?apiKey=s4wxvhdxmf7m5ktwxjm6hxr8&upc=035000521019";
// });
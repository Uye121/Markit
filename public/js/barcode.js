'use strict';
//import Quagga from 'quagga';
//var Quagga = require('quagga').default;

/* https://www.youtube.com/watch?v=qzbHxlQAa5o 

function order_by_occurence(arr) {
    var counts = {};
    arr.forEach(function(value) {
        if(!counts[value]) {
            counts[value] = 0;
        }
        counts[value] ++;
    });

    return Objects.keys(counts).sort(function(curKey, nextKey) {
        return counts[curKey] < counts[nextKey];
    });
}

function load_quagga() {
    if($('#barcode-scanner').length>0 && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia == 'function') {
        var last_result = [];
        if(Quagga.initialized == undefined) {
            Quagga.onDetected(function(result) {
                var last_code = result.codeResult.code;
                last_result.push(last_code);
                if(last_result.length > 20) {
                    code = order_by_occurence(last_result)[0];
                    last_result = [];
                    Quagga.stop();
                    $.ajax ({
                        type: "POST", 
                        url: '/products/get_barcode',
                        data: { upc: last_code }
                    });
                }
            });
        }
        
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                numOfWorkers: navigator.hardwareConcurrency,
                target: document.querySelector('#barcode-scanner')
            },
            decoder: {
                readers: ['ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader']
            }
        }, function(err) {
            if(err) { console.log(err); return }
            Quagga.initialized = true;
            Quagga.start();
        });

    }
};

$(document).on('turbolinks:load', load_quagga);
*/

/*
Quagga.decodeSingle({
    src: "image-abc-123.jpg",
    numOfWorkers: 0,  // Needs to be 0 when used within node
    inputStream: {
        size: 800  // restrict input-size to be 800px in width (long-side)
    },
    decoder: {
        readers: ["code_128_reader"] // List of active readers
    },
}, function(result) {
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
});

Quagga.init({
    inputStream : {
      name : "Live",
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
        halfSampe: true
    },
    numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),

    decoder : {
        readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader"
        ]
    },
    locate: true
  }, function(err) {
      if (err) {
          console.log(err);
          Quagga.stop();
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });
  */

 $(function() {
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
					{"format":"ean_reader","config":{}}
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
        console.log("stuff");
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
			Quagga.decodeSingle($.extend({}, fileConfig, {src: URL.createObjectURL(e.target.files[0])}), function(result) {alert(result.codeResult.code);});
		}
	});
})

var modal = document.getElementById('modal');
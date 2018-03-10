var data = require("../data.json");

exports.view = function(req, res){
  // Reset variables
  data.scanFound=false;
  data.scanRes=[];
  var code="";
  
  code=req.query.txtSearch;
  console.log("barcode: " + code);

  if(code !== "" && code != undefined) {
    data.scanInit = true;

    // Append an extra zero in front of UPC code
    if(code.length == 12) {
      code="0"+code;
    }

    if(code.length == 13) {
      for(i=0; i<data.list.length; i++) {
        var barcode = data.list[i].barcode;
        if(code == barcode) {
          if(i == 0)
            data.scanRes.push(data.list[1]);
          else if(i == 1)
            data.scanRes.push(data.list[0]);
          data.scanRes.push(data.list[i]);
          data.scanFound=true;
        }
      }
    }
  }

  res.render('scan', data);
  };

exports.view2 = function(req, res){
  // Reset variables
  data.scanFound=false;
  data.scanRes=[];
  var code="";
  
  code=req.query.txtSearch;
  console.log("barcode: " + code);

  if(code !== "" && code != undefined) {
    data.scanInit = true;

    // Append an extra zero in front of UPC code
    if(code.length == 12) {
      code="0"+code;
    }

    if(code.length == 13) {
      for(i=0; i<data.list.length; i++) {
        var barcode = data.list[i].barcode;
        if(code == barcode) {
          data.scanRes.push(data.list[i]);
          data.scanFound=true;
        }
      }
    }
  }

  res.render('scan2', data);
  };
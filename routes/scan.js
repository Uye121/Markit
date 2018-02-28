var data = require("../data.json");

exports.view = function(req, res){
  var code=req.query.txtSearch;
  console.log("barcode: " + code);

  if(code !== "" && code != undefined && code.length == 13) {
    for(i=0; i<data.list.length; i++) {
      var barcode = data.list.barcode;
      if(code == barcode) {
        data.scanRes.push(data.list[i]);
      }
    }
  }

  res.render('scan', data);
  };
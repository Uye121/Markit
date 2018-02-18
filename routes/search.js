var data = require("../data.json");

exports.view = function(req, res){
	// reset keyword
	var keyWord = "";
	keyWord = req.query.txtSearch;
	var filteredData = [];
	console.log(keyWord);

	if(keyWord !== "") {
		for(i=0; i<data.list.length; i++) {
			if(data.list[i].name === keyWord) {
				data.res.push(data.list[i]);
			}
		}
	}

    res.render('search', data);
};

function showResult(result) {
	var projectHTML = '<a href="#" class="detailsImage">' +
	'<img src="' + result['product_image_urls'] + '" class="img"></a>' +
	'<p>' + result['name'] +
	'</p>' + result['description'];
}


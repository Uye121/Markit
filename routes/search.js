
/*
 * GET search page.
 */

var data = require("../data.json");

exports.view = function(req, res){
	// reset keyword
	var keyWord = "";
	keyWord = req.query.txtSearch;
	var filteredData = [];
	console.log(keyWord);

	if(keyWord !== undefined) {
		for(var unit in data) {
			// if(unit.name.includes(keyWord) != -1) {
			// 	filteredData.push(unit);
			// }
		}
	}

	console.log(filteredData);

    res.render('search', filteredData);
};

function showResult(result) {
	var projectHTML = '<a href="#" class="detailsImage">' +
	'<img src="' + result['product_image_urls'] + '" class="img"></a>' +
	'<p>' + result['name'] +
	'</p>' + result['description'];

	$()
}



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
		console.log("for loop: ");
		for(var unit in data) {
			for(var name in unit) {
				console.log(name);
			}
			// if(unit.name.includes(keyWord) != -1) {
			// 	filteredData.push(unit);
			// }
		}
	}

	console.log(filteredData);

    res.render('search', data);
};

function showResult(result) {
	var projectHTML = '<a href="#" class="detailsImage">' +
	'<img src="' + result['product_image_urls'] + '" class="img"></a>' +
	'<p>' + result['name'] +
	'</p>' + result['description'];

	$()
}


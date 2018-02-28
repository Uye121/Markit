var data = require("../data.json");

exports.view = function(req, res){
	data.res=[];
	var keyWord = "";
	keyWord = req.query.txtSearch;

	// TODO init only when user started searching for things
	if(req.query != "") {
		console.log("searching...");
	} else {
		console.log("initing...");
	}

	if(keyWord !== "" && keyWord != undefined) {
		// Reset the result output
		if(data.res.length != 0) data.res = [];

		data.searchWord = keyWord;

		keyWord = keyWord.toLowerCase();
		for(i=0; i<data.list.length; i++) {
			var item = data.list[i];
			if(item.name.toLowerCase().indexOf(keyWord) > 0 || item.brand.toLowerCase().indexOf(keyWord) > 0 || item.category.toLowerCase().indexOf(keyWord) > 0) {
				data.res.push(item);
			}
		}

		if(data.res.length == 0 && keyWord != "") data.searchFound = false;
		else data.searchFound = true;
	}

    res.render('search', data);
};

// function showResult(result) {
// 	var projectHTML = '<a href="#" class="detailsImage">' +
// 	'<img src="' + result['product_image_urls'] + '" class="img"></a>' +
// 	'<p>' + result['name'] +
// 	'</p>' + result['description'];
// }


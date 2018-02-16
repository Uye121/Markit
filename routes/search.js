
/*
 * GET search page.
 */

var data = require("../data.json");
var suggest = [];


exports.view = function(req, res){
    console.log("search");
    suggestion();
    res.render('search', suggest);
};



function suggestion(){
	for(var i in data.list){
		if(data.list[i] === "5"){
			suggest.push(data.list[i]);
		}
	}
	return suggest;
};


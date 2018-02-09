
/*
 * GET home page.
 */

exports.view = function(req, res){
  console.log("index");
  res.render('index');
};
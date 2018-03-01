
/*
 * GET home page.
 */

exports.view = function(req, res){
  console.log("log_in");
  res.render('log_in');
};

exports.originalview = function(req, res) {
  res.render('original_login');
}
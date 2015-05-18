
module.exports = function(app, m, c) {

	app.get("/", c.HomeController.index);
	app.get("/resume", c.HomeController.getResume);

};
var m,
	c;

module.exports = function(models, controllers) {
	m = models;
	c = controllers;

	return exports;
};

exports.index = function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var visitor = req.query.visitor;
  var company = {};
  var servePage = function() {
    setTimeout(function() {
      var visit = {
        ip: ip
      }
      if(company && company.name) {
        visit.company = company.name;
        visit.companyId = company.id;
      }
      else {
        visit.company = "none";
        visit.companyId = "none";
      }
      console.log(c);
      c.tools.addVisit(visit, function(){});
    }, 0);
    res.render("index.ejs", {
      company: company
    });
  }
  if(visitor) {
    return c.tools.getCompany(visitor, function(c) {
      company = c;
      servePage();
    });
  }
  servePage();
};

exports.getResume = function(req, res) {
  var type = req.query.version;
  if(!(type == "software" || type == "electrical" || type == "embedded")) {
    type = "all"
  }
  c.tools.getResume(type, function(resume) {
    res.render("resume.ejs", {resume: resume});
  });
};

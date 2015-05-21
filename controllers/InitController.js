var m,
	c,
	async = require('async'),
	fs = require('fs');

module.exports = function(models, controllers) {
	m = models;
	c = controllers;

	return exports;
}

// TODO: ADD UTITLITY TO CONFIGURE RESUMES AND COMPANIES
exports.init = function(req, res) {
	res.send("Initialization Triggered");
	var resumes = [
	{
	  id: "all",
	  title: "Generic",
	  skills: '["java", "c", "microcontrollers", "chips", "node", "git", "scripting", "opamps", "digitalLogic", "linux", "python", "dns", "soldering", "android"]'
	},
	{
	  id: "software",
	  title: "Software",
	  skills: '["java","c", "node", "git", "linux", "scripting", "android"]'
	},
	{
	  id: "embedded",
	  title: "Embedded Systems",
	  skills: '["c", "microcontrollers", "chips", "soldering", "scripting", "linux", "digitalLogic", "opamps"]'
	},
	{
	  id: "electrical",
	  title: "Electrical",
	  skills: '["chips", "microcontrollers", "digitalLogic", "opamps", "soldering", "scripting"]'
	}
	];

	var projectPairings = {
		"1": ['all', 'embedded', 'electrical'], //line following robot
		"2": ['all', 'software'], // order tracking
		"3": ['all', 'software'], // web tools
		"4": ['all', 'embedded', 'electrical'] // lego robot
	};

	var resumeSkills = [
	{
	  id: "java",
	  title: "Java",
	  description: "Proficient in Java."
	},
	{
	  id: "c",
	  title: "C and C++",
	  description: "Intermediate understanding of C and C++."
	},
	{
	  id: "node",
	  title: "Node.js & JavaScript",
	  description: "Fluent with Node.js and JavaScript."
	},
	{
	  id: "git",
	  title: "Git",
	  description: "Git experience from personal projects and work environments."
	},
	{
	  id: "microcontrollers",
	  title: "Microcontrollers",
	  description: "Experience with Arduino and Electric Imp microcontrollers"
	},
	{
		id: "digitalLogic",
		title: "Digital Logic",
		description: "Knowledge of digital logic circuits and design."
	},
	{
		id: "opamps",
		title: "OpAmp Circuits",
		description: "Able to design operation amplifier circuits components for signal conditioning."
	},
	{
	  id: "scripting",
	  title: "Scripting",
	  description: "Comfortable with scripting languages such as Python and Ruby."
	},
	{
	  id: "linux",
	  title: "Linux",
	  description: "Comfortable with a Linux environment, specifically Ubuntu."
	},
	{
	  id: "dns",
	  title: "Network and DNS",
	  description: "Strong knowledge of network design and DNS."
	},
	{
	  id: "android",
	  title: "Android",
	  description: "Basic knowledge of Android application structure."
	},
	{
	  id: "chips",
	  title: "Integrated Circuits",
	  description: "Very familiar with the use of various IC's as well as I2C and SPI"
	},
	{
	  id: "soldering",
	  title: "Soldering",
	  description: "Experience soldering through hole and surface mount electronics."
	}
	];

	var projects = [
	{
		name: "Line Following Robot",
		description: "Assisted in design and creation of a line following robot. Soldered components to a PCB and created signal conditioning circuits with Op Amps."
	},
	{
		name: "Order Tracking",
		description: "Created a Java application to keep track orders in production in a factory."
	},
	{
		name: "Full Stack Web Tools",
		description: "Wrote web tools to assist with assigning tasks to employees, as well as an application to send in quotes for production."
	}, 
	{
		name: "Lego Robots",
		description: "Designed and built lego robots. Specifically a rack and pinion car with a joystick that communicated over bluetooth."
	}
	]

	var companies = [
	
	];
	// c.CompanyController.createCompanies(companies);

	// async.eachSeries(resumes, function(resume, callback) {
	// 	m.Resume.findOrCreate({where: resume}).then(function(){
	// 		callback();
	// 	});
	// });

	// projects.forEach(function(project) {
	// 	m.Project.findOrCreate({where: project});
	// });

	// Object.keys(projectPairings).forEach(function(project) {
	// 	projectPairings[project].forEach(function(resume) {
	// 		m.ResumeProject.findOrCreate({where: {
	// 			ResumeId: resume,
	// 			ProjectId: project
	// 		}});
	// 	});
	// });

	// resumeSkills.forEach(function(resumeSkill) {
	//   m.ResumeSkill.findOrCreate({where: resumeSkill});
	// });

	// c.ProjectController.createProjects(projects);

	exports.createPrintableResumeLinks();
};

exports.createPrintableResumeLinks = function() {

	var companies,
		resumes;

	async.series([
		function(callback) {
			m.Company.findAll().then(function(results) {
				companies = results;
				callback();
			});
		},
		function(callback) {
			m.Resume.findAll().then(function(results) {
				resumes = results;
				callback();
			})
		},
		function(callback) {
			fs.unlink('./companyLinks.html', function() {
				callback();
			});
		},
		function(callback) {
			var contents = "<html><body>";
			companies.forEach(function(company) {
				resumes.forEach(function(resume) {
					contents += "<a target='_blank' href='http://francescomacc.com/resume?print=true&version=";
					contents += resume.id;
					contents += "&company=" + company.id;
					contents += "'>" + company.name + " : " + resume.title;
					contents += "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
				});
				contents += "<br>"
			});
			contents += "</body></html>";
			fs.writeFileSync('./companyLinks.html', contents);
			callback();
		}
		])

};
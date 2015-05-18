'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require('config').db;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

db.sequelize.sync().then(function() {

  // var resumes = [
  // {
  //   id: "all",
  //   title: "Generic",
  //   skills: '["java", "c", "microcontrollers", "chips", "node", "git", "linux", "python", "dns", "soldering", "html", "android"]'
  // },
  // {
  //   id: "software",
  //   title: "Software",
  //   skills: '["java","c", "node", "git", "linux", "python", "html", "android"]'
  // },
  // {
  //   id: "embedded",
  //   title: "Embedded Systems",
  //   skills: '["c", "microcontrollers", "chips", "soldering", "java", "linux"]'
  // },
  // {
  //   id: "electrical",
  //   title: "Electrical",
  //   skills: '["chips", "microcontrollers", "soldering"]'
  // }
  // ];

  // var resumeSkills = [
  // {
  //   id: "java",
  //   title: "Java",
  //   description: "Proficient in Java. Used thoroughly in two job placements, and have been using it on and off for two years."
  // },
  // {
  //   id: "c",
  //   title: "C and C++",
  //   description: "Intermediate understanding of C and C++. Used for all university programming assignments. Used for real time embedded systems"
  // },
  // {
  //   id: "node",
  //   title: "Node.js & JavaScript",
  //   description: "Comfortable with Node.js and fluent in JavaScript. Used Node.js for creating a full stack web application."
  // },
  // {
  //   id: "git",
  //   title: "Git and SVN",
  //   description: "Git is used for all of my personal projects. Used SVN during my time at PointClickCare."
  // },
  // {
  //   id: "python",
  //   title: "Python",
  //   description: "Comfortable with Python. Created a personal web server written in Python."
  // },
  // {
  //   id: "linux",
  //   title: "Linux",
  //   description: "Comfortable with a Linux environment, specifically Ubuntu. All my personal projects are created in a Linux environment, as well as some work projects."
  // },
  // {
  //   id: "dns",
  //   title: "Network and DNS",
  //   description: "Strong knowledge of network design and DNS. Doubled as the IT guy at Lumotune."
  // },
  // {
  //   id: "html",
  //   title: "Web Technologies",
  //   description: "Very familiar with HTML, JQeury and SQL. All three appear in most of my personal projects."
  // },
  // {
  //   id: "android",
  //   title: "Android",
  //   description: "Basic knowledge of Android application structure. Have created very minimal applications in the past."
  // },
  // {
  //   id: "microcontrollers",
  //   title: "Microcontrollers",
  //   description: "Have used the Arduino for personal projects. Used the electric imp microcontroller extensively during a work term."
  // },
  // {
  //   id: "chips",
  //   title: "Integrated Circuits",
  //   description: "Very familiar with the use of various IC's as well as communicating with them using I2C. Have used shift registers and IO expanders."
  // },
  // {
  //   id: "soldering",
  //   title: "Soldering",
  //   description: "Experience soldering through hole and surface mount electronics through multiple class labs."
  // }
  // ];

  // var companies = [];

  /*
  var companyPairings = "";
  var createCompany = function(i) {
    if(i < companies.length) {
      var hash = crypto.createHash('sha1');
      hash.update("secretSaltString" + companies[i].name);
      var id = hash.digest('hex');
      companies[i].id = id;
      companyPairings += id + " : " + companies[i].name + "\n";
      return db.Company.create(companies[i]).then(function() {
        createCompany(i + 1);
      });
    }
    fs.writeFile('companies.txt', companyPairings, function(){});
  };
  createCompany(0);
  */

  // resumes.forEach(function(resume) {
  //   db.Resume.findOrCreate({where: resume});
  // });

  // resumeSkills.forEach(function(resumeSkill) {
  //   db.ResumeSkill.findOrCreate({where: resumeSkill});
  // });
});

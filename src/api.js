const fs = require('fs');


// Module variables
var data = {};
var datafile = "";

// function handleRequest(req, res) {  
//   if(req.method === 'POST' && req.url === '/courses') {
//     return createCourse(req, res);
//   } else {
//     res.statusCode = 400;
//     res.end("Not implemented");
//   }
// }

/** @function handleRequest
  * This function maps incoming requests to
  * API calls.
  * TODO set up mapping.
  * @param {http.clientRequest} req - the incoming request
  * @param {http.serverResponse} res - the response to serve
  */
function handleRequest(app) {  
  /* Read ALL courses */
  app.get("/courses", function(req, res) {
    res.status(200).send(data);
  });

  /* Read a specific course */
  app.get("/courses/:id", function(req, res) {
    var courseID = req.params.id;
    res.status(200).send(data["courses"][courseID]);
  });

  app.post("/courses", function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var desc = req.body.desc;
    var prereqs = req.body.requisites;
    var typOff = req.body.typicallyOffered;
    var kState8 = req.body.kState8;

    /* Add a new course */
    // var course = {  
    //   name: name,
    //   desc: desc,
    //   requisites: prereqs,
    //   typicallyOffered: typOff,
    //   kState8: kState8    
    // };
    // data["course"][id] = course;

    // createCourse(req, res);
    // data["courses"][id] = id;
    // save();
  });
}

// function createCourse(req, res) {
//   var jsonString = "";

//   req.on('data', function(chunk) {
//     jsonString += chunk;
//   });

//   req.on('error', function(err) {
//     console.error(err);
//     res.statusCode = 500;
//     res.end("Server Error");
//   });

//   req.on('end', function(){
//     try {
//       var course = JSON.parse(jsonString);
//       var tokens = course.name.split(" ");
//       if(tokens.length < 2) {
//         res.statusCode = 422;
//         res.end("Poorly formatted course entry");
//         return;
//       }
//       var id = tokens[0] + tokens[1];
//       data["courses"][id] = course;
//       save();
//       res.statusCode = 200;
//       res.end(id);
//     } catch (err) {
//       console.error(err);
//       res.statusCode = 500;
//       res.end("Server Error: " + err);
//     }
//   });

// }

/** @function load
  * Loads the persistent data file
  * @param {string} filename - the file to load
  */
function load(filename) {
  datafile = filename;
  data = JSON.parse(fs.readFileSync(filename, {encoding: "utf-8"}));
}

/** @function save
  * Saves the data to the persistent file
  */
function save() {
  console.log(data);
  fs.writeFileSync(datafile, JSON.stringify(data));
}

/** @module API
  * A module implementing a REST API
  */
module.exports = {
  load: load,
  handleRequest: handleRequest
}

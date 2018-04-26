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
  /* GET ALL courses */
  app.get("/courses", function(req, res) {
    req.on('error', function(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error");
    });

    var courses = data['courses'];
    res.status(200).send(JSON.stringify(Object.values(courses)));
  });

  /* GET a specific course */
  app.get("/courses/:id", function(req, res) {
      req.on('error', function(err) {
        console.error(err);
        res.statusCode = 500;
        res.end("Server Error");
      });

      var courseID = req.params.id;
      var course = data["courses"][courseID];
      res.status(200).send(course);
  });

  app.post("/courses", function(req, res) {
    var body = req.body;

    // var nameReg = new RegExp("[^-]*");
    // var idReg = nameReg.exec(body.name);
    // if(!idReg){
    //   res.status(500).send('ID not there!');
    // }
    // var id = idReg[0].replace(/\s+/g, '');;
    var id = body.name;
    id = JSON.stringify(id).replace(/\//g, '');
    console.log(id);
    data['courses'][id] = body;
    console.log(data['courses'][id]);
    save();
    res.send(JSON.stringify(body));


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

function removeBackslashes(jsonString) {

}

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

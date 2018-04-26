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
  /* READ ALL courses as a JSON object */
  app.get("/courses", function(req, res) {

    try {
      var courses = data['courses'];
      res.status(200).send(JSON.stringify(Object.values(courses)));
    }
    catch(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error: " + err);
    }
  });

  /* READ a specific course as a JSON object */
  app.get("/courses/:id", function(req, res) {
      var courseID = req.params.id;

      try {      
        var course = data["courses"][courseID];
        res.status(200).send(course);
      }
      catch(err) {
        console.error(err);
        res.statusCode = 500;
        res.end("Server Error: " + err);
      }
  });

  /* CREATE a new course from the JSON body of the request */
  app.post("/courses", function(req, res) {
    var body = req.body;
    var name = body.name;

    console.log(req.body.credits);

    try{
        
        /* Get the two words that make the name. 
        These two words will be the ID */
        var tokens = name.split(" ");

        /* Throw an error if less than 2 words */
        if(tokens.length < 2) {
          res.statusCode = 422;
          res.end("Poorly formatted course entry");
          return;
        }

        var id = tokens[0] + tokens[1];
        data['courses'][id] = body;
        save();
        res.statusCode(200).send(JSON.stringify(body));
    }
    catch(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error: " + err);
    }
  });

  /* UPDATE a new course from the JSON body of the request */
  app.put("/courses/:id", function(req, res) {
    var body = req.body;

    try {
      /* Find a course with the corresponding ID */
      data['courses'][req.params.id] = body; 
      save();
      res.status(200).send(JSON.stringify(body));
    }
    catch(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error: " + err);
    }
  });

  /* DELETE course specified */
  app.delete("/courses/:id", function(req, res) {
    var body = req.body;

    try {
      /* Find a course with the corresponding ID */
      delete data['courses'][req.params.id]; 
      save();
      res.status(200).send(JSON.stringify(body));
    }
    catch(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error: " + err);
    }
  });
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
  // console.log(data);
  fs.writeFileSync(datafile, JSON.stringify(data));
}

/** @module API
  * A module implementing a REST API
  */
module.exports = {
  load: load,
  handleRequest: handleRequest
}

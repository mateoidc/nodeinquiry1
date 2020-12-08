// Express package
const express = require("express");
const app = express();
// grabbing json package
const fs = require("fs");

// Port
const port = 8080;
let employeeData;
fs.readFile("employees.json", (err, data) => {
  if (err) throw err;
  employeeData = JSON.parse(data);
});

// Routes
app.get("/", (req, res) => {
  res.send(employeeData);
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  // looping through array

  const employee = employeeData.employee.find((e) => {
    if (e.id == req.params.id) {
      return e;
    }
  });
  // When testing in browser non 200 status code keeps the page same but makes a request behind the scenes.

  if (!employee) {
    res.status(204);
    res.send("COULD NOT FIND EMPLOYEE");
  }
  res.send(JSON.stringify(employee));
});

// Listening for port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

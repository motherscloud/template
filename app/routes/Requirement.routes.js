module.exports = app => {
  const Requirements = require("../controllers/Requirement.controller.js");

  var router = require("express").Router();

  // Create a new Requirement
  router.post("/", Requirements.create);

  // Retrieve all Requirements
  router.get("/Requirements", Requirements.findAll);

  // Retrieve a single Requirement with id
  router.get("/Requirements:id", Requirements.findOne);

  // Update a Requirement with id
  router.put("/Requirements:id", Requirements.update);

  // Delete a Requirement with id
  router.delete("/Requirements:id", Requirements.delete);

  // Create a new Requirement
  router.delete("/Requirements", Requirements.deleteAll);

  app.use("/api/Requirements", router);
};

module.exports = app => {
  const Goal = require("../controllers/Goal.controller.js");

  var router = require("express").Router();

  // Create a new Goal
  router.post("/", Goal.create);

  // Retrieve all Goals
  router.get("/goals", Goal.findAll);

  // Retrieve a single Goal with id
  router.get("/goals:id", Goal.findOne);

  // Update a Goal with id
  router.put("/goals:id", Goal.update);

  // Delete a Goal with id
  router.delete("/goals:id", Goal.delete);

  // Create a new Goal
  router.delete("/goals", Goal.deleteAll);

  app.use("/api/goals", router);
};

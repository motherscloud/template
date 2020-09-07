module.exports = app => {
  const Work = require("../controllers/Work.controller.js");

  var router = require("express").Router();

  // Create a new Work
  router.post("/", Work.create);

  // Retrieve all Works
  router.get("/Works", Work.findAll);

  // Retrieve a single Work with id
  router.get("/Works:id", Work.findOne);

  // Update a Work with id
  router.put("/Works:id", Work.update);

  // Delete a Work with id
  router.delete("/Works:id", Work.delete);

  // Create a new Work
  router.delete("/Works", Work.deleteAll);

  app.use("/api/Works", router);
};

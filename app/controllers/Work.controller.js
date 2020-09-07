const db = require("../models");
const { goal } = require("../models");
const { requirement } = require("../models");
const Work = db.work;
const Op = db.Sequelize.Op;
var flatten = require('flat');

// Create and Save a new Work
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Work_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Work
  const work = {
    Work_id: req.body.Work_id,
    Work_title: req.body.Work_title,
    Work_description: req.body.Work_description,
    requirementReqId: req.body.Req_id
  };

  // Save Work in the database
  Work.create(work)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Work."
      });
    });
};

// Retrieve all Works from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${Work_title}%` } } : null;

  Work.findAll({ where: condition ,include: [{model:requirement ,include: [goal]}]})
    .then(data => {
      //Work.map(({id, requirement}) => ({Work_id, Req_id})),
      //console.log(data),
      res.send(data),  
      console.log(data);     
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Requirement."
      });
    });
};

// Find a single Work with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Work.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Work with id=" + id
      });
    });
};

// Update a Work by the id in the request
exports.update = (req, res) => {
  const Work_id = req.params.Work_id;

  Requirement.update(req.body, {
    where: { Work_id: Work_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Work was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Work with id=${Work_id}. Maybe Work was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Work with id=" + Work_id
      });
    });
};

// Delete a Work with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.Work_id;

  Work.destroy({
    where: { Work_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Work was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Work with id=${id}. Maybe Work was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Work with id=" + id
      });
    });
};

// Delete all Work from the database.
exports.deleteAll = (req, res) => {
  Requirement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Work were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Work."
      });
    });
};



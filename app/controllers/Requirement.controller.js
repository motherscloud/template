const db = require("../models");
const { goal } = require("../models");
const Requirement = db.requirement;
const Op = db.Sequelize.Op;
const flat = require('flat');

// Create and Save a new Requirement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Req_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Requirement
  const requirement = {
    Req_id: req.body.Req_id,
    Req_title: req.body.Req_title,
    Req_description: req.body.Req_description,
    goalGoalId: req.body.Goal_id
  };

  // Save Requirement in the database
  Requirement.create(requirement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Requirement."
      });
    });
};

// Retrieve all Requirements from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Requirement.findAll({ where: condition ,include :goal })
    .then(data => {
      res.send(data);
      })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Requirement."
      });
    });
};

// Find a single Requirement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Requirement.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Requirement with id=" + id
      });
    });
};

// Update a Requirement by the id in the request
exports.update = (req, res) => {
  const Req_id = req.params.Req_id;

  Requirement.update(req.body, {
    where: { Req_id: Req_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Req was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Req with id=${Req_id}. Maybe Requirement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Requirement with id=" + Req_id
      });
    });
};

// Delete a Requirement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.Requirement_id;

  Requirement.destroy({
    where: { Requirement_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Requirement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Requirement with id=${id}. Maybe Requirement was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Requirement with id=" + id
      });
    });
};

// Delete all Requirement from the database.
exports.deleteAll = (req, res) => {
  Requirement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Requirements were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Requirement."
      });
    });
};



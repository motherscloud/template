const db = require("../models");
const Goal = db.goal;
const Op = db.Sequelize.Op;

// Create and Save a new Goal
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Goal_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Goal
  const goal = {
    Goal_id: req.body.Goal_id,
    Goal_title: req.body.Goal_title,
    Goal_description: req.body.Goal_description
  };

  // Save Goal in the database
  Goal.create(goal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Goal."
      });
    });
};

// Retrieve all Goal from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Goal.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Goal."
      });
    });
};

// Find a single Goal with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Goal.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Goal with id=" + id
      });
    });
};

// Update a Goal by the id in the request
exports.update = (req, res) => {
  const Goal_id = req.params.Goal_id;

  Goal.update(req.body, {
    where: { Goal_id: Goal_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Goal was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Goal with id=${Goal_id}. Maybe Goal was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Goal with id=" + Goal_id
      });
    });
};

// Delete a Goal with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.Goal_id;

  Goal.destroy({
    where: { Goal_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Goal was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Goal with id=${id}. Maybe Goal was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Goal with id=" + id
      });
    });
};

// Delete all Goals from the database.
exports.deleteAll = (req, res) => {
  Goal.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Goals were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Goals."
      });
    });
};



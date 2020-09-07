const requirement = require("./Requirement.model.js");
const goal = require("./Goal.model.js");
module.exports = (sequelize, Sequelize) => {
  const Goal = sequelize.define("goal", {
    Goal_id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey:true
    },
    Goal_title: {
      type: Sequelize.STRING
    },
    Goal_description: {
      type: Sequelize.STRING
    }
  },{
    timestamps:false
  });

  

  return Goal;
};

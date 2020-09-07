module.exports = (sequelize, Sequelize) => {
  const Requirement = sequelize.define("requirement", {
    Req_id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey:true
    },
    Req_title: {
      type: Sequelize.STRING
    },
    Req_description: {
      type: Sequelize.STRING
    },
  },{
    timestamps:false
  });
  
  

  return Requirement;
};

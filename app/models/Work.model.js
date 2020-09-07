module.exports = (sequelize, Sequelize) => {
  const Work = sequelize.define("work", {
    Work_id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey:true
    },
    Work_title: {
      type: Sequelize.STRING
    },
    Work_description: {
      type: Sequelize.STRING
    }
  },{
    timestamps:false
  });

  return Work;
};

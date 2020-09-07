const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.goal = require("./Goal.model.js")(sequelize, Sequelize);
db.requirement = require("./Requirement.model.js")(sequelize, Sequelize);
db.work = require("./Work.model.js")(sequelize, Sequelize);

db.goal.hasMany(db.requirement,{ as: "requirement"});
db.requirement.belongsTo(db.goal,{
  foreighKey:{
  name:"Goal_Id",
  allowNull:false}
});

db.requirement.hasMany(db.work,{ as: "work"});
db.work.belongsTo(db.requirement,{
  foreighKey:{
  name:"Req_Id",
  allowNull:false}
});

/*db.work.belongsTo(db.goal, {through: db.requirement});*/

module.exports = db;

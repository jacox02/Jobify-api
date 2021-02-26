module.exports = (sequelize, Sequelize) => {
  const Config = sequelize.define("config", {
    Work_Quantity: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
    },
  });
  return Config;
};

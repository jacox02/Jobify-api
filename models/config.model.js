module.exports = (sequelize, Sequelize) => {
  const Config = sequelize.define("config", {
    Work_Quantity: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
      defaultValue: 10,
    },
    Selected_Category: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
      defaultValue: 1,
    },
  });
  return Config;
};

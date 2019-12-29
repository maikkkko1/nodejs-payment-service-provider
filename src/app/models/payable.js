module.exports = (sequelize, DataTypes) => {
  const Payable = sequelize.define("Payable", {
    clientId: DataTypes.INTEGER,
    value: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    paymentDate: DataTypes.STRING,
    status: DataTypes.STRING,
    fee: DataTypes.STRING
  });

  return Payable;
};

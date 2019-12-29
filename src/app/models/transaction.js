module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    clientId: DataTypes.INTEGER,
    value: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    cardData: DataTypes.TEXT,
    installments: DataTypes.INTEGER
  });

  return Transaction;
};

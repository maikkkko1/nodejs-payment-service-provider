/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-29 10:37:26
 * @modify date 2019-12-29 10:37:26
 * @desc Transaction table sequelize model.
 */

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

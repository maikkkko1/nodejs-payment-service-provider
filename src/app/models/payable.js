/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-29 10:37:26
 * @modify date 2019-12-29 10:37:26
 * @desc Payable table sequelize model.
 */

module.exports = (sequelize, DataTypes) => {
  const Payable = sequelize.define("Payable", {
    clientId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    originalValue: DataTypes.DOUBLE,
    feeValue: DataTypes.DOUBLE,
    value: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    paymentDate: DataTypes.STRING,
    status: DataTypes.STRING,
    fee: DataTypes.STRING
  });

  return Payable;
};

'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Payables", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
      },
      clientId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      transactionId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      originalValue: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      feeValue: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      value: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      paymentDate: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING
      },
      fee: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("Payables");
  }
};

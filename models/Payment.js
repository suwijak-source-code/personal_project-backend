module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      paymentType: {
        type: DataTypes.ENUM,
        values: ["TRANSFER", "DEBITCART", "CREDITCART", "EPAYMENT"],
        allowNull: false,
      },
    },
    {
      underscored: false,
    }
  );
  Payment.associate = (models) => {
    Payment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Payment;
};

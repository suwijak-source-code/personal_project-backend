module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      status: {
        type: DataTypes.ENUM,
        values: ["not_expired", "expired"],
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  Ticket.associate = (models) => {
    Ticket.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Ticket;
};

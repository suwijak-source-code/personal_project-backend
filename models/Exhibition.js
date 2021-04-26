module.exports = (sequelize, DataTypes) => {
  const Exhibition = sequelize.define(
    "Exhibition",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["UPCOMMING", "SHOWING", "EXPIRED"],
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  Exhibition.associate = (models) => {
    Exhibition.hasMany(models.Content, {
      foreignKey: {
        name: "exhibitionId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Exhibition.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Exhibition;
};

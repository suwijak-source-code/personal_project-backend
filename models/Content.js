module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    "Content",
    {
      picture: DataTypes.STRING,
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  Content.associate = (models) => {
    Content.belongsTo(models.Exhibition, {
      foreignKey: {
        name: "exhibitionId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Content;
};

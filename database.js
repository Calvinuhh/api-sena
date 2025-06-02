import { Sequelize, DataTypes } from "sequelize";

const database = new Sequelize("api", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export const Usuario = database.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default database;

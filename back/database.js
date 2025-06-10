import { Sequelize, DataTypes } from "sequelize";

const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } =
  process.env;

const database = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: "postgres",
    logging: false,
  }
);

export const Usuario = database.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 50],
          msg: "El nombre debe tener entre 2 y 50 caracteres",
        },
      },
    },
    apellido: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 50],
          msg: "El apellido debe tener entre 2 y 50 caracteres",
        },
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);

export const Post = database.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

Usuario.hasMany(Post, {
  foreignKey: "usuario_id",
});

Post.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

export default database;

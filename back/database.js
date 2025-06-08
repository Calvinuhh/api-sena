import { Sequelize, DataTypes } from "sequelize";

process.loadEnvFile();
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env;

const database = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: "localhost",
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

export const Like = database.define(
  "Like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["usuario_id", "post_id"],
      },
    ],
  }
);

export const Comentario = database.define(
  "Comentario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

// Relaciones existentes
Usuario.hasMany(Post, {
  foreignKey: "usuario_id",
});

Post.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

// Nuevas relaciones para Likes
Usuario.hasMany(Like, {
  foreignKey: "usuario_id",
});

Post.hasMany(Like, {
  foreignKey: "post_id",
});

Like.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

Like.belongsTo(Post, {
  foreignKey: "post_id",
});

// Nuevas relaciones para Comentarios
Usuario.hasMany(Comentario, {
  foreignKey: "usuario_id",
});

Post.hasMany(Comentario, {
  foreignKey: "post_id",
});

Comentario.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

Comentario.belongsTo(Post, {
  foreignKey: "post_id",
});

export default database;

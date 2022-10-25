import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME, // НАЗВАНИЕ БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // Пароль
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    schema: process.env.DB_SCHEME
  }
);
import { Sequelize } from "sequelize";
import { dbConfig } from "./config";

const sequelizeConnection = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  schema: dbConfig.SCHEMA,
  dialect: 'postgres',
  define: {
    timestamps: true,
    paranoid: true,
  },
})

export default sequelizeConnection
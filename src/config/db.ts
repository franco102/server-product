import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import { MySqlDialect } from '@sequelize/mysql';

dotenv.config()

// const db=new Sequelize(process.env.DB_URL_POSTGRES!,{
//     models:[__dirname+'/../models/**/*'],
//     logging:false
// })
const db=new Sequelize({
    database: process.env.DB_NAME, // Nombre de la base de datos
    username: process.env.DB_USER, // Usuario
    password: process.env.DB_PASS, // Contraseña
    host: process.env.DB_HOST, // Host (e.g., localhost)
    port: parseInt(process.env.DB_PORT || "3306"), // Puerto MySQL (por defecto es 3306)
    dialect: "mysql", // Dialecto MySQL
    models:[__dirname+'/../models/**/*'],
    logging:false
})
export default db
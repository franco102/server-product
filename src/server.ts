import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerSpec, { swaggerUiOptions } from './config/swagger' 
import  swaggerUi  from 'swagger-ui-express'
import cors ,{ CorsOptions } from 'cors' 
import morgan from 'morgan'

//Conectar a base de datos 
const connectDB = async() =>{
    try {
        await db.authenticate()
        db.sync()
        console.log('Base de datos conectada')
    }catch(err){
        console.log(err)
        console.log( colors.bgRed.white('Error al conectarse a base de datos') )

    }
}
connectDB()

const server = express()

//Leer datos de formularios

server.use(express.json())
//Habilitar cords
const allowedOrigins = [process.env.BACKEND_URL, process.env.FRONTEND_URL];
const corsOptions:CorsOptions={
    origin:function(origin,callback){
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No tiene acceso'));
        }
    }
}
server.use(cors(corsOptions))
server.use('/api/products', router)
server.use(morgan('dev'))

server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec,swaggerUiOptions))

server.use('/api', (req,res)=>{
    res.json({msg:'Desde aPI'})
})

export default server
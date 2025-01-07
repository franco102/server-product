import { Request, Response} from 'express'
import { validationResult } from 'express-validator'
import Product from '../models/Product.model'

export const  createProduct=async (req: Request,res:Response)=>{
    // await check('name').notEmpty().withMessage('El nombre del producto  no puede se vacio').run(req)
    // await check('price')
    //         .isNumeric().withMessage('Valor no válido')
    //         .notEmpty().withMessage('El precio del producto  no puede se vacio')
    //         .custom(value=>value>0).withMessage('El precio tiene que se mayor a 0')
    //         .run(req)

    try {
        const product = await  Product.create(req.body)
        res.status(201).json({data:product})
        
    } catch (error) {
        console.log(error)
    }
 
    // const savedProduct=await  product.save()
}

export const getProducts=async(req: Request,res:Response)=>{
    const products=await  Product.findAll({
        order:[
            ['price','ASC']
        ],
        limit:2,
        attributes:{
            exclude:['createdAt','updatedAt']
        }
    })
    res.json({data:products})
}
export const getProductById=async(req: Request,res:Response)=>{
    const id=req.params.id
    const product=await  Product.findByPk(id)
    if (!product) {
        res.status(404).json({error:'Producto no encontredo'})
    }else{
        res.json({data:product})
    }
    
}

export const updateProduct=async(req: Request,res:Response)=>{
    const id=req.params.id
    const product=await  Product.findByPk(id)
    if (!product) {
        res.status(404).json({error:'Producto no encontredo'})
    }else{
        await product.update(req.body)
        await product.save()
        res.json({data:product})
    }
}
export const updateAvailability=async(req: Request,res:Response)=>{
    const id=req.params.id
    const product=await  Product.findByPk(id)
    if (!product) {
        res.status(404).json({error:'Producto no encontredo'})
    }else{
        product.availability=!product.dataValues.availability
        await product.save()
        res.json({data:product})
    }
}
export const deleteProduct=async(req: Request,res:Response)=>{
    const id=req.params.id
    const product=await  Product.findByPk(id)
    if (!product) {
        res.status(404).json({error:'Producto no encontredo'})
    }else{
        await product.destroy()
        res.json({data:'producti eliminado'})
    }
}
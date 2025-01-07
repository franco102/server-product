import { Router } from "express";
import { body, param }  from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router=Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product name
 *                  example: Monitor Curvo de 49 Pulgadas
 *              price:
 *                  type: number
 *                  description: The Product Price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The Product Availability 
 *                  example: true
 */

/**
 * @swagger
 * /api/products: 
 *  get:
 *      summary: Get a List of Products
 *      tags:
 *          - Products
 *      description: Return a List of  Products
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}: 
 *  get:
 *      summary: Get a  Product by Id
 *      tags:
 *          - Products
 *      description: Return  Product based by Id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product toretrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found 
 *          400:
 *              description: Bad Request 
 */
/**
 * @swagger
 * /api/products: 
 *  post:
 *      summary: Get a new Product  
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        name:
 *                            type: string
 *                            example: "Monitor curso 49 pulgadas"
 *                        price:
 *                            type: number
 *                            example: 500
 *      responses:
 *          201:
 *              description: Product created  Successfull 
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data  
 */
/**
 * @swagger
 * /api/products/{id}: 
 *  put:
 *      summary: Updates a products  with user input  
 *      tags:
 *          - Products
 *      description: Return a updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product toretrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        name:
 *                            type: string
 *                            example: "Monitor curso 49 pulgadas"
 *                        price:
 *                            type: number
 *                            example: 500
 *                        availability:
 *                            type: boolean
 *                            example: true
 *      responses:
 *          200:
 *              description: Product created  Successfull 
 *              content:
 *                  application/json:
 *                      schema: 
 *                            $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data  
 *          404:
 *              description: Produc not found
 */
/**
 * @swagger
 * /api/products/{id}: 
 *  patch:
 *      summary: Update only availability of product  
 *      tags:
 *          - Products
 *      description: Return a updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product toretrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product created  Successfull 
 *              content:
 *                  application/json:
 *                      schema: 
 *                            $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data  
 *          404:
 *              description: Produc not found
 */
/**
 * @swagger
 * /api/products/{id}: 
 *  delete:
 *      summary: Delete   product by Id
 *      tags:
 *          - Products
 *      description: Return a updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product toretrieve
 *          required: true
 *          schema:
 *              type: integer 
 *      responses:
 *          200:
 *              description: Product deleted  Successfull 
 *              content:
 *                  application/json:
 *                      schema: 
 *                            $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data  
 *          404:
 *              description: Produc not found
 */



// Routing
router.get('/',getProducts)
router.get('/:id',
    param('id').isInt().withMessage('Id no es valido'),
    handleInputErrors,
    getProductById
)
router.post('/',
    body('name')
    .notEmpty().withMessage('El nombre del producto  no puede se vacio'),

    body('price').isNumeric().withMessage('Valor no válido')
            .notEmpty().withMessage('El precio del producto  no puede se vacio')
            .custom(value=>value>0).withMessage('El precio tiene que se mayor a 0'),
    handleInputErrors,
    createProduct
)

router.put('/:id',
    param('id').isInt().withMessage('Id no es valido'),
    handleInputErrors,
    updateProduct
)
router.patch('/:id',
    param('id').isInt().withMessage('Id no es valido'),
    handleInputErrors,
    updateAvailability
)
router.delete('/:id',
    param('id').isInt().withMessage('Id no es valido'),
    handleInputErrors,
    deleteProduct
)

export default router;
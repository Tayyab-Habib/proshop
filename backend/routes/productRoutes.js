import express from 'express'
const router = express.Router()
import { getProducts,getProductsById } from '../controllers/productController.js'
// After adding the controller we can do something like this 
// router.get('/',asyncHandeler(async(req,res)=>{
//     const products = await Product.find({})
//     res.json(products)
// }))

// router.get('/:id',asyncHandeler(async(req,res)=>{
//     // const product= products.find((p)=>p._id===req.params.id)
//     const product = await Product.findById(req.params.id)
//     if(product){
//         return res.json(product)
//     }else{
//         // res.status(404).json({message: 'Oops!Product not found'})
//         res.status(404)
//         throw new Error('Resource not found')
//     }
// }))



router.route('/').get(getProducts)
router.route('/:id').get(getProductsById)
export default router
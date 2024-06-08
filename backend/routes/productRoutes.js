import express from 'express'
const router = express.Router()
import { createProduct, getProducts,getProductsById, updateProduct, deleteProduct, createProductReview, getTopProducts } from '../controllers/productController.js'

import { protect, admin} from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkValidObjectId.js'


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



router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/top').get (getTopProducts)
router.route('/:id').get( checkObjectId,getProductsById).put(protect, admin,checkObjectId, updateProduct).delete(protect, admin,checkObjectId, deleteProduct )
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview)
export default router
import { isValidObjectId } from "mongoose";
const checkObjectId= (req,res,next)=>{
    if(!isValidObjectId(req.params.id)){
        res.status(404)
        throw new Error(`Invalis ObjectId of: ${req.params.id}`)

    }
    next()
}

export default checkObjectId
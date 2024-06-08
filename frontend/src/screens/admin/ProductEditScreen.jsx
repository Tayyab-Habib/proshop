import React from 'react'
import { useState, useEffect,  } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice'

const ProductEditScreen = () => {

    const {id: productId} = useParams()

    const [name,SetName] = useState('')
    const [price,SetPrice] = useState(0)
    const [image,SetImage] = useState('')
    const [brand,SetBrand] = useState('')
    const [category,SetCategory] = useState('')
    const [countInStock,SetCountInStock] = useState(0)
    const [description,SetDescription] = useState('')

    const { data:product, isLoading, refetch, error}= useGetProductDetailsQuery(productId)
    const [updateProduct, { isLoading: loadingUpdate}] = useUpdateProductMutation()
    const navigate = useNavigate()
    const [uploadImage, {isLoading: loadingUpload}] = useUploadProductImageMutation()

    useEffect(()=>{
        if(product){
            SetName(product.name)
            SetPrice(product.price)
            SetImage(product.image)
            SetBrand(product.brand)
            SetCategory(product.category)
            SetCountInStock(product.countInStock)
            SetDescription(product.description)
        }
    },[product])

    const submitHandler = async (e)=>{
        e.preventDefault()
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }

        const result = await updateProduct(updatedProduct)

        if(result.error){
            toast.error(result.error)
        }else{
            toast.success('Product Updated')
            navigate('/admin/listProducts')
        }
    }

    const uploadFileHandler = async (e)=>{
        const formData = new FormData()
        formData.append('image',e.target.files[0])
        try {
            const res = await uploadImage(formData).unwrap()
            toast.success(res.message)
            SetImage(res.image)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  return (
    <>
    <Link to='/admin/listProducts' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}

        {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error.data.message}</Message>): (
            <>
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e)=>SetName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price' >
                    <Form.Label className='mt-2'>Price</Form.Label>
                    <Form.Control 
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e)=>SetPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='image'>
                   <Form.Label>Image</Form.Label> 
                   <Form.Control type='text' placeholder='Enter image url' value={ image } onChange={ (e) => SetImage(e.target.value)}>

                   </Form.Control>
                   <Form.Control type='file' label='Choose file' onChange={uploadFileHandler}></Form.Control>
                </Form.Group>

                {image && <img src={image} alt='product' style={{ width: '100px', marginTop: '10px' }} />}

                <Form.Group controlId='brand' >
                    <Form.Label className='mt-2'>Brand</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e)=>SetBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock' >
                    <Form.Label className='mt-2'>Count In Stock</Form.Label>
                    <Form.Control 
                    type='number'
                    placeholder='Enter Count In Stock'
                    value={countInStock}
                    onChange={(e)=>SetCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category' >
                    <Form.Label className='mt-2'>Category</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter Category'
                    value={category}
                    onChange={(e)=>SetCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description' >
                    <Form.Label className='mt-2'>Description</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter Description'
                    value={description}
                    onChange={(e)=>SetDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
            <Button variant='primary' type='submit'
            className='my-2'>
                Update
            </Button>
            </Form>
            </>
        )}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen
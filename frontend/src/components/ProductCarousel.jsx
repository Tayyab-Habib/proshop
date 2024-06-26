import React from 'react'
import { Link} from 'react-router-dom'
import { Image, Carousel} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Loader'
import {  useGetTopProductsQuery } from '../slices/productsApiSlice'

const ProductCarousel = () => {
    const { data: topProducts, isLoading, error}= useGetTopProductsQuery()
  return isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
       {topProducts.map((product)=>(
        <Carousel.Item key={product._id}>
            <Link to ={`/products/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid rounded/>
                <Carousel.Caption className='carousel-caption'>
                    <h2>
                        {product.name} (${product.price})
                    </h2>
                </Carousel.Caption>
            </Link>
        </Carousel.Item>
       ))} 
    </Carousel>
  )
}

export default ProductCarousel
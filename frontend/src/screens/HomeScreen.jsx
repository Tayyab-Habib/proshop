import {useEffect, useState} from 'react'
import React from 'react'
import {Row,Col} from "react-bootstrap"
import Product from '../components/Product'
// import axios from 'axios'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
  // const [products,setProducts]= useState([])
  // useEffect(()=>{
  //   const fetchProducts = async ()=>{
  //     const {data} = await axios.get('/api/products')
  //     setProducts(data)
  //   }
  //   fetchProducts()
  // },[])
  //Now we will use productsApiSlice to fetch data

  const {data: products, isLoading, error} = useGetProductsQuery()
  return (
    <>
    {isLoading ? (
      <Loader/>
    ): error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) : (<>
    <h1>
    Latest Products
</h1>
<Row>
    {products.map((product)=>(
        <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product}/>
        </Col>
    ))}
</Row>
    </>) }
    </>
  )
}

export default HomeScreen
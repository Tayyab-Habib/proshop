import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery, usePayOderMutation } from '../slices/ordersApiSlice'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Form, Card, Button, NavLink, Col, ListGroup, Image,
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'
const OrderScreen = () => {
    const { id:orderId} = useParams()

    const { data:order ,refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
    
    const [ payOrder, { isLoading: LoadingPay, error: isPending } ] = usePayOderMutation()
    const paymentTest = async ()=>{
        const res = await payOrder({ orderId, details: { payer:{}}})
        refetch()
        toast.success('Payment Successful')
    }
    const { userInfo } = useSelector((state) => state.auth)
  return (
    <>
    { isLoading ? (<Loader/>) : error ? ( <Message variant='danger'/>) : (
        <>
        <h3>OrderId: {order._id}</h3>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong> Name: </strong>{order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>{order.user.email}
                        </p>
                        <p>
                            <strong>
                                Address: 
                            </strong>{' '}{order.shippingAddress.address}, {order.shippingAddress.city}{' '}{order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                        ) : (<Message variant='danger'> Order not delivered </Message>)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>
                                Method:
                            </strong>
                            {' '}{order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (<Message variant='danger'> Order not paid </Message>)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col>
                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                            {item.qty} × ${item.price} = ${item.qty * item.price}
                                        </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items Price</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>

                            <Row>
                                <Col>Shipping Price</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>

                            <Row>
                                <Col>Tax Price</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total Price</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>

                        </ListGroup.Item>
                        
                        {
                            !order.isPaid  && (
                                <ListGroup.Item>
                                    {LoadingPay ? (<Loader/>) :(<div>
                                            <Button onClick={paymentTest}>Test pay order</Button>
                                        </div>) }
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )}

    </>
  )
}

export default OrderScreen
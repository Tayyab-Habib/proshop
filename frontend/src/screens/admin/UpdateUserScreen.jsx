import React from 'react'
import { useEffect,useState } from 'react'
import {Button, Form,} from 'react-bootstrap'
import { useGetUserDetailsQuery,useUpdateUserMutation } from '../../slices/usersApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useParams} from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { toast} from 'react-toastify'



const UpdateUserScreen = () => {
const{id:userId} = useParams()
 const [name,SetName] = useState('')
 const [email,SetEmail] = useState('')
 const [isAdmin,SetIsAdmin] = useState(false)

const {data:user ,iaLoading:userLoading, refetch, error} = useGetUserDetailsQuery(userId)
const [updateUser, {isLoading: updateLoading}]=useUpdateUserMutation()
 useEffect(()=>{
    if(user){
        SetName(user.name)
        SetEmail(user.email)
        SetIsAdmin(user.isAdmin)
    }
 },[user])
   const navigate = useNavigate()

   
 
 const submitHandler = async (e)=>{
    e.preventDefault()
    if(window.confirm('Are you sure')){
        try {
            await updateUser({userId,name,email,isAdmin});
                toast.success("User updated Successfully");
                refetch()
                navigate('/admin/listusers')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
 }
  return (
    <>
    <Link to='/admin/listusers' className='btn btn-light my-3'>
        Go Back
    </Link>
    
    <FormContainer>
        <h1>Edit Users</h1>
        {updateLoading && <Loader/>}
        {userLoading ? (<Loader/>) : error ? (
            <>
            <Message variant='danger'>User not found</Message>
            </>
        ) : (
           <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter you name' value={name} onChange={(e)=>SetName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter you email' value={email} onChange={(e)=>SetEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin' className='my-2'>
                <Form.Check type='checkbox' label='Is Admin'
                checked={isAdmin} onChange={(e) => SetIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>
            <Button variant='primary' type='submit'
            className='my-2'>
                Update
            </Button>
           </Form> 
        )}


    </FormContainer>
    </>
  )
}

export default UpdateUserScreen
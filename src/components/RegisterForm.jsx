import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SnackbarContext } from '../context/SnackbarContext'
import CustomSnackbar from './CustomSnackbar'

function RegisterForm() {
    const {setOpen, setSeverity, setMessage} = useContext(SnackbarContext)
    const [input, setInput] = useState({
        name:'',
        username:'',
        email:'',
        password:'',
        password_confirmation:''
    })
    const nameRef = useRef()
    const navigate = useNavigate()

    const handleChange = (event) => {
        // console.log(event.target.value)
        if(event.target.name === 'name') {
            setInput({...input, name: event.target.value})
        } else if (event.target.name === 'username') {
            setInput({...input, username: event.target.value})
        } else if (event.target.name === 'email') {
            setInput({...input, email: event.target.value})
        } else if (event.target.name === 'password') {
            setInput({...input, password: event.target.value})
        } else if (event.target.name === 'password_confirmation') {
            setInput({...input, password_confirmation: event.target.value})
        }
    }

    const handleAlertOpen = () => {
        setOpen(true)
        setSeverity('success')
        setMessage('berhasil melakukan registrasi')
        navigate('/login')
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://api-project.amandemy.co.id/api/register', {
                name: input.name,
                username: input.username,
                email: input.email,
                password: input.password,
                password_confirmation: input.password_confirmation
            })
            const data_user = input
            console.log(JSON.stringify(data_user))
            handleAlertOpen()

            setInput({
                name:'',
                username:'',
                email:'',
                password:'',
                password_confirmation:''
            })
        } catch (error) {
            setOpen(true)
            setSeverity('error')
            setMessage(error.response.data.info)
           console.log(error.response.data.info)
        } finally {
            navigate('/login')
        }
    }

    useEffect (() => {
        nameRef.current.focus()
    }, [input.name])

  return (
    <div>
        <CustomSnackbar/>
        <div className='grid grid-col-3 gap-4'>
            <label htmlFor='name'>Name</label>
            <input 
                type='text' 
                id='name' 
                placeholder='Masukkan nama Anda'
                name='name'
                value={input.name}
                ref={nameRef}
                onChange={handleChange}
                className='col-start-2 col-end-4 border rounded p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none'/>
            <label htmlFor='username'>Username</label>
            <input 
                type='text' 
                id='username' 
                placeholder='Masukkan username Anda'
                name='username'
                value={input.username}
                onChange={handleChange}
                className='col-start-2 col-end-4 border rounded p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none'/>
            <label htmlFor='email'>Email</label>
            <input 
                type='text' 
                id='email' 
                placeholder='Masukkan email Anda'
                name='email'
                value={input.email}
                onChange={handleChange}
                className='col-start-2 col-end-4 border rounded p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none'/>
            <label htmlFor='pwd'>Password</label>
            <input 
                type='password' 
                id='pwd' 
                placeholder='Masukkan password'
                name='password'
                value={input.password}
                onChange={handleChange}
                className='col-start-2 col-end-4 border rounded p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none'/>
            <label htmlFor='confirm-pwd'>Comfirm Password</label>
            <input 
                type='password' 
                id='confirm-pwd'
                placeholder='Masukkan ulang password'
                name='password_confirmation' 
                value={input.password_confirmation}
                onChange={handleChange}
                className='col-start-2 col-end-4 border rounded p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none'/>
                <div className='col-span-3 place-self-end'>
                    <button
                        onClick={handleSubmit} 
                        className=" bg-teal-500 border-2 border-teal-500 text-white py-1 px-5 rounded" >Register</button>
                </div>
        </div>
    </div>
  )
}

export default RegisterForm
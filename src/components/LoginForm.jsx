import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SnackbarContext } from '../context/SnackbarContext'
import CustomSnackbar from './CustomSnackbar'


function LoginForm() {
    const {setOpen, setSeverity, setMessage} = useContext(SnackbarContext)
    const [input, setInput] = useState({
        email:'',
        password:'',
    })

    const navigate = useNavigate()

    const handleAlertOpen = () => {
        setOpen(true)
        setSeverity('success')
        setMessage('berhasil login')
        navigate('/table')
    }

    const handleChange = (event) => {
        let key = event.target.name
        let value = event.target.value
        setInput({...input, [key]: value})
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://api-project.amandemy.co.id/api/login', {
                email: input.email,
                password: input.password,
            })
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('username', response.data.data.user.username)
            // alert(response.data.info)
            if (response.data.info == 'Berhasil Melakukan Login Pengguna') {
                handleAlertOpen()
            }
            setInput({
                email:'',
                password:''
            })
        } catch (error) {
            setOpen(true)
            setSeverity('error')
            setMessage(error.response.data.info)
           console.log(error.response.data.info)
        } 
    }

    return (
        <div>
            <CustomSnackbar />
            <div className='grid grid-col-2 gap-4'>
                <label htmlFor='email'>Email</label>
                <input 
                    type='text' 
                    id='email' 
                    placeholder='Masukkan email Anda'
                    name='email'
                    value={input.email}
                    onChange={handleChange}
                    className='col-start-2 col-end-3 border rounded p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none'/>
                <label htmlFor='pwd'>Password</label>
                <input 
                    type='password' 
                    id='pwd' 
                    placeholder='Masukkan password Anda'
                    name='password'
                    value={input.password}
                    onChange={handleChange}
                    className='col-start-2 col-end-3 border rounded p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none'/>
                <div className='col-span-2'>
                        <button
                           onClick={handleSubmit}
                            className=" w-full bg-teal-500 border-2 border-teal-500 text-white py-0.5 px-1.5 rounded-lg" >Login</button>
                        
                    </div>
            </div>
        </div>
      )
}

export default LoginForm
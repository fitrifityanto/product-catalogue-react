import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import axios from 'axios'

function Navbar() {
  const navigate = useNavigate()

  const confirm = useConfirm()

  const onLogOut = async () => {
    try {
      const response = await axios.post('https://api-project.amandemy.co.id/api/logout', 
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      alert(error)
      console.log(error.response)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      navigate('/')
    }
  }

  const handleLogOut = async () => {
    try {
      await confirm({
          title: 'Anda yakin?',
          description: `Anda akan Log Out`,
          confirmationText: 'Ya',
          cancellationText: 'Tidak'
      })
      onLogOut()
  } catch (error) {
      console.log('logout dibatalkan')
  }
  }

  const username = () => {
    if (localStorage.getItem('token')) {
      const matches = localStorage.getItem('username').toUpperCase().match(/\b(\w)/g)
      return matches
    }
  }
 
  const avatarStyle = {
    backgroundColor: '#009688'
  }

  return (
    <>
    <header className='shadow-lg shadow-gray-200'>
        <div className='mx-4'>
        <div>
            <nav className='flex justify-between items-center py-2'>
                <img className='max-w-[30%] md:max-w-[20%] lg:max-w-[15%]' src='/logo-retrobrand.jpg'/>
                <ul className='flex justify-center w-full gap-4'>
                    <Link to='/'><li className='nav-items text-teal-500'>Home</li></Link> 
                    <Link to='/products'><li className='nav-items text-teal-500'>Products</li></Link> 
                    <Link to='/table'><li className='nav-items text-teal-500'>Table</li></Link> 
                </ul>
                <div className='flex w-[40%] justify-end'>
                  {
                    localStorage.getItem('token') ? (
                      <div className='flex gap-4 items-center'>
                        <Avatar sx={avatarStyle} >{username()}</Avatar>
                        <span>Halo, {localStorage.getItem('username')} </span>
                        <button onClick={handleLogOut} className='text-teal-500 border-2 border-teal-500 font-bold py-2 px-4 rounded'>LOGOUT</button>
                      </div>
                    ) : (
                  <div className='flex gap-4'>
                    <Link to='/login'>
                    <button className='text-teal-500 border-2 border-teal-500 font-bold py-2 px-4 rounded'>LOGIN</button>
                    </Link>
                    <Link to='/register'>
                    <button className='bg-teal-500 border-2 border-teal-500 text-white font-bold py-2 px-4 rounded'>REGISTER</button></Link>
                  </div>
                    )
                  }
                </div>
            </nav>
        </div>
        </div>
    </header>
    </>
  )
}

export default Navbar
import React, { useEffect, useRef } from 'react'
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
      // alert(error)
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

  const mobileButtonRef = useRef({})
  const mobileMenuRef = useRef()

  useEffect(()=> {
    const handleMenu = (event) => {
      mobileMenuRef.current.classList.toggle('hidden')
      console.log('clicked')
    }
    const element = mobileButtonRef.current
    element.addEventListener ('click', handleMenu)
  }, [])

  return (
    <>
    <header className='shadow-lg shadow-gray-200'>
        <div className='mx-4'>
        <div>
          <nav className='py-2'>
            <div className='mx-auto'>
              <div className='flex justify-between items-center'>
                <div className='flex w-full items-center'>
                  {/* img logo */}
                  <div>
                    <img src='/logo-retrobrand.jpg' className='w-52' />
                  </div>
                  {/* primary navbar items */}
                  <div className='invisible lg:visible w-full'>
                    <ul className='md:flex justify-center gap-4'>
                      <Link to='/'><li className='nav-items text-teal-500'>Home</li></Link> 
                      <Link to='/products'><li className='nav-items text-teal-500'>Products</li></Link> 
                      <Link to='/table'><li className='nav-items text-teal-500'>Table</li></Link> 
                    </ul>
                  </div>
                </div>
                {/* secondary navbar items */}
                <div className='invisible lg:visible w-[40%] flex justify-end'>
                  <div className='md:flex items-center'>
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
                </div>
                {/* mobile menu button */}
                <div className='lg:hidden flex items-center'>
                  <button className='outline-none' ref={mobileButtonRef}>
                    <svg className='w-6 h-6 text-gray-500'
                        x-xlinkshow='!showMenu'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                    <path d='M4 6h16M4 12h16M4 18h16'></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className='hidden' ref={mobileMenuRef}>
              <div>
                <ul className='flex flex-col'>
                  <Link to='/'><li className='nav-items text-teal-500'>Home</li></Link> 
                  <Link to='/products'><li className='nav-items text-teal-500'>Products</li></Link> 
                  <Link to='/table'><li className='nav-items text-teal-500'>Table</li></Link> 
                </ul>
              </div>
              <div className=' items-center'>
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
            </div>
          </nav>
        </div>
        </div>
    </header>
    </>
  )
}

export default Navbar
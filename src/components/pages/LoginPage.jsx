import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import LoginForm from '../LoginForm'

function LoginPage() {
    return (
        <>
        <Navbar/>
        <main>
          <div className='mx-4 min-h-screen'>
            <div className='lg:max-w-2xl mx-auto my-10 p-10 border rounded-3xl drop-shadow-lg bg-white' >
                <div className="flex">
                    <h2 className="text-teal-500 text-xl font-bold mb-10">Login Form</h2>
                </div>
                <LoginForm />
            </div>
          </div>
        </main>
        <Footer />
        </>
      )
}

export default LoginPage
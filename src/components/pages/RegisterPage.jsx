import React from 'react'
import RegisterForm from '../RegisterForm'
import Navbar from '../Navbar'
import Footer from '../Footer'

function RegisterPage() {
  return (
    <>
    <Navbar/>
    <main>
      <div className='mx-4 min-h-screen'>
        <div className='lg:max-w-5xl mx-auto my-10 p-10 border rounded-3xl drop-shadow-lg bg-white'>
            <div className="flex">
                <h2 className="text-teal-500 text-xl font-bold mb-10">Register Form</h2>
            </div>
            <RegisterForm />
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}

export default RegisterPage
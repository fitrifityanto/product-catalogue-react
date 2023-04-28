import React from 'react'
import UpdateForm from '../UpdateForm'
import Navbar from '../Navbar'
import Footer from '../Footer'

function UpdatePage() {
  return (
    <>
    <Navbar/>
    <main>
      <div className='mx-4 min-h-screen'>
        <div className='lg:max-w-7xl mx-auto my-10 p-10 border rounded-3xl drop-shadow-lg bg-white'>
          <div className="flex justify-between">
            <h2 className="text-teal-500 text-xl font-bold mb-10">Update Products</h2>
          </div>
          <UpdateForm />
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}

export default UpdatePage
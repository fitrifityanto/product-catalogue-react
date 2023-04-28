import React from 'react'
import CreateForm from '../CreateForm'
import Navbar from '../Navbar'
import Footer from '../Footer'

function CreatePage() {
  return (
    <>
    <Navbar/>
    <main>
      <div className='mx-4 min-h-screen'>
        <div className='lg:max-w-7xl mx-auto my-10 p-10 border rounded-3xl drop-shadow-lg bg-white'>
          <div className="flex justify-between">
            <h2 className="text-teal-500 text-xl font-bold mb-10">Create Products</h2>
          </div>
          <CreateForm />
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}

export default CreatePage
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import CardProduct from '../CardProduct'
import Navbar from '../Navbar'
import Footer from '../Footer'

function ProductPage() {
    const {products, setProducts, fetchProducts, isLoading } = useContext(GlobalContext)
    useEffect (() => {
        fetchProducts()
    },[])

  return (
    <>
    <Navbar/>
    <main>
        <div className='mx-4 min-h-screen'>
            <div className='lg:max-w-7xl mx-auto my-10'>
                <div className="flex justify-between">
                    <h2 className="text-teal-500 text-xl font-bold mt-10">Catalog Products</h2>
                </div>
                {isLoading === true ? (
                <div className='flex justify-center'>
                    <div className='rounded-full w-14 h-14 bg-gradient-to-tr from-teal-500 to-rose-500 animate-spin'>
                        <div className='h-9 w-9 rounded-full bg-purple-200'></div>
                    </div>
                </div>) : (
                <div className='flex gap-5 flex-wrap justify-center mt-4'>
                    { products.map((product) => {
                        return <CardProduct product={product} key={product.id} />
                    })
                    }
                </div>
                )}
            </div>
        </div>
    </main>
    <Footer />
    </>
  )
}

export default ProductPage
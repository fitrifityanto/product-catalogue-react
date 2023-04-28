import React, { useContext, useEffect} from 'react'
import CardProduct from './CardProduct'
import { GlobalContext } from '../context/GlobalContext'
import { Link } from 'react-router-dom'

function ProductSlice() {
    const {products, fetchProducts, isLoading } = useContext(GlobalContext)
    
    useEffect (() => {
        fetchProducts()
    },[])

  return (
    <>
    <div className='mx-4'>
        <div className='lg:max-w-7xl mx-auto my-10'>
            <div className="flex justify-between items-center">
                <h2 className="text-teal-500 text-xl font-bold">Catalog Products</h2>
                <Link to='/products'>
                <button className="rounded bg-teal-700 text-white px-4 py-3">See More</button>
                </Link>
            </div>
            {
                isLoading === true ? (
                    <div className='flex justify-center'>
                        <div className='rounded-full w-14 h-14 bg-gradient-to-tr from-teal-500 to-rose-500 animate-spin'>
                            <div className='h-9 w-9 rounded-full bg-purple-200'></div>
                        </div>
                    </div>
                ) : (
                    
            <div className='flex gap-5 flex-wrap justify-center mt-4'>
            { products.slice(0,4).map((product,i) => {
                return <CardProduct product={product} key={product.id} />
            })
            }
            </div>
                )
            }
        </div>
    </div>
    </>
  )
}

export default ProductSlice
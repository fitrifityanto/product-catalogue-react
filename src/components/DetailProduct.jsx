import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function DetailProduct() {
    const {id} = useParams()
    const [ product, setProduct ] = useState ([])
    const {isLoading, setIsLoading } = useContext(GlobalContext)

    const fetchDetail = async () => {
        // console.log('sedang melakukan fetching')
        try {
            setIsLoading(true)
            const response = await axios.get(`https://api-project.amandemy.co.id/api/final/products/${id}`)
            // console.log(response.data.data)
            setProduct(response.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchDetail()
    }, [])


  return (
    <>
    <div className="mx-4 my-16 min-h-screen">
        <div className="lg:max-w-5xl mx-auto px-4 py-8 shadow-lg shadow-gray-300">
            <div className="mb-8 text-teal-500">
                <Link to='/'><span className='inline-block mr-0.5'>Home</span></Link>/ 
                <Link to='/products'><span className='inline-block mx-0.5'>Product</span></Link>/ 
                <span className='inline-block ml-0.5 border-b border-teal-500'>Detail</span> 
            </div>
            {isLoading === true ? (
            <div className='flex justify-center'>
                <h2 className='text-teal-500 text-xl font-bold'>L O A D I N G ....</h2>
            </div>
            ) : (
            <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                <div className="md:basis-5/12 lg:basis-5/12"><img className="h-80 w-full object-cover rounded-lg" src={product.image_url} /></div>
                <div className="md:basis-8/12 lg:basis-8/12 flex flex-col justify-between gap-5">
                    <div>
                        <div className="text-3xl">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                    <div>
                        <div className="text-2xl">
                        {product.harga_diskon === 0 ? product.harga_display : <s>{product.harga_display}</s> }
                        </div>
                        <div className={`text-4xl text-red-500 ${product.harga_diskon === 0 ? 'hidden' : 'visible'}  `}>{product.harga_diskon_display}</div>
                    </div>
                    <div>{product.description}</div>
                    <div className="text-teal-500 font-bold">Stock {product.stock}</div>
                </div>
            </div>
            )}
        </div>
    </div>    
    </>
  )
}

export default DetailProduct
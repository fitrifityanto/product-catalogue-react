import React from 'react'
import { Link } from 'react-router-dom'

function CardProduct({product}) {
  
  return (
    <>
        <div className="w-60 shadow-lg shadow-gray-200 rounded-2xl">
          <div>
            <Link to={`/products/detail/${product.id}`}>
            <img className="h-60 w-full object-cover rounded-tl-2xl rounded-tr-2xl" src={product.image_url}/>
            </Link>
           </div>
          <div className="p-4 h-36 flex flex-col justify-between">
            <div className="font-semibold"> 
            {
              product.name.length > 40 ? product.name.substring(0,40)+' ...' : product.name
            }
            </div>
            <div className="text-sm">
            { product.harga_diskon === 0 ? product.harga_display : <s>{product.harga_display}</s> }
            </div>
            <div className={` text-red-500 ${product.harga_diskon === 0 ? 'hidden' : 'visible'}  `}>{product.harga_diskon_display}</div>
            <div className="text-sm text-blue-500">{product.stock}</div>
          </div>
        </div>
    </>
  )
}

export default CardProduct
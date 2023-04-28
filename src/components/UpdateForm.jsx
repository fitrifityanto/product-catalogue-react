import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { SnackbarContext } from '../context/SnackbarContext'
import CustomSnackbar from './CustomSnackbar'

function UpdateForm() {
    const {setOpen, setSeverity, setMessage} = useContext(SnackbarContext)

    const navigate = useNavigate()
    const {id} = useParams()

    const [input, setInput] = useState({
        name: '',
        stock:'',
        harga:'',
        harga_diskon:'',
        is_diskon: false,
        category:'',
        image_url:'',
        description:'',
    })

    const handleChange = (event) => {
        // console.log(event.target.checked)
        if(event.target.name === 'name') {
            setInput({...input, name: event.target.value})
        } else if (event.target.name === 'stock') {
            setInput({...input, stock: event.target.value})
        } else if (event.target.name === 'harga') {
            setInput({...input, harga: event.target.value})
        } else if (event.target.name === 'harga_diskon') {
            setInput({...input, harga_diskon: event.target.value})
        } else if (event.target.name === 'category') {
            setInput({...input, category: event.target.value})
        } else if (event.target.name === 'image_url') {
            setInput({...input, image_url: event.target.value})
        } else if (event.target.name === 'description') {
            setInput({...input, description: event.target.value})
        } else if (event.target.name === 'is_diskon') {
            setInput({...input, is_diskon: event.target.checked})
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://api-project.amandemy.co.id/api/final/products/${id}`, {
                name: input.name,
                stock: input.stock,
                harga: input.harga,
                harga_diskon: input.harga_diskon,
                is_diskon: input.is_diskon,
                category: input.category,
                image_url: input.image_url,
                description: input.description,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
            )
            setOpen(true)
            setSeverity('success')
            setMessage(`berhasil mengubah produk '${input.name}' `)
            navigate('/table')
        } catch (error) {
            setOpen(true)
            setSeverity('error')
            setMessage(error.response.data.info)
        }
    }

    const fetchDetail = async () => {
        try {
            const response = await axios.get(`https://api-project.amandemy.co.id/api/final/products/${id}`)
            const product = response.data.data
            setInput({
                name: product.name,
                stock: product.stock,
                harga: product.harga,
                harga_diskon: product.harga_diskon,
                is_diskon: product.is_diskon,
                category: product.category,
                image_url: product.image_url,
                description: product.description
            })
            // console.log(response.data.data)
        } catch (error) {
            console.log(error)
        } 
      }
    
      useEffect (() => {
        fetchDetail()
      }, [])

  return (
    <>
    <CustomSnackbar />
    <div className="grid gap-4 lg:grid-col-5 md:grid-col-3">
        <div className="lg:col-span-3 md:col-span-2">
            <label className="block mb-2"> Nama Barang </label>
            <input 
                className="border rounded w-full p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none" 
                type="text" 
                name='name' 
                value={input.name}
                onChange={handleChange}/>
        </div>
        <div className="lg:col-start-4 lg:col-span-2 md:col-start-3 md:col-end-4">
            <label className="block mb-2"> Stok Barang </label>
            <input 
                className="border rounded w-full p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none" 
                type="text" 
                name='stock' 
                value={input.stock}
                onChange={handleChange}/>
        </div>
        <div className="lg:col-span-2">
            <label className="block mb-2"> Harga Barang </label>
            <input 
                className="border rounded w-full p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none" 
                type="text" 
                name='harga' 
                value={input.harga}
                onChange={handleChange}/>
        </div>
        <div className={`${input.is_diskon === true ? 'self-center md:m-auto lg:m-auto' : 'lg:col-start-3 lg:col-span-2'} `}>
            <label>
                <input 
                    type="checkbox" 
                    name='is_diskon' 
                    checked={input.is_diskon} 
                    onChange={handleChange}/>
                <span> Status Diskon</span>
            </label>
        </div>
        <div className={`'lg:col-start-4 lg:col-span-2' ${input.is_diskon === true ? '' : 'hidden'} `}>
            <label className="block mb-2"> Harga Diskon </label>
            <input 
                className="border rounded w-full p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none" 
                type="text" 
                name='harga_diskon' 
                value={input.harga_diskon} 
                onChange={handleChange}/>
        </div>
        <div className="lg:col-span-2 md:col-span-2">
            <label className="block mb-2"> Gambar Barang </label>
            <input 
                className="border rounded w-full p-1 bg-gray-200 text-sm focus:bg-white focus:outline-none" 
                type="text" 
                name='image_url' 
                value={input.image_url}
                onChange={handleChange}/>
        </div>
        <div className="lg:col-start-3 lg:col-span-3">
            <label className="block mb-2"> Kategori Barang </label>
            <select 
                className="w-full border rounded bg-gray-200 text-sm focus:bg-white focus:outline-none" 
                name='category' value={input.category} 
                onChange={handleChange}>
                <option  value="">Pilih Kategori</option>
                <option  value="teknologi">Teknologi</option>
                <option value="makanan">Makanan</option>
                <option  value="minuman">Minuman</option>
                <option value="hiburan">Hiburan</option>
                <option value="kendaraan">Kendaraan</option>
            </select>
        </div>
        
        <div className="lg:col-span-5 md:col-span-3">
            <label htmlFor="message" className="block mb-2 ">Deskripsi Barang</label>
            <textarea 
                id="message" 
                rows="4" 
                className="block p-2.5 w-full border rounded bg-gray-200 text-sm focus:bg-white focus:outline-none" name='description' 
                value={input.description}
                onChange={handleChange}></textarea>
        </div>
        <div className="lg:col-span-5 md:col-span-3 flex gap-2 justify-end">
 
            <button className="bg-teal-500 border-2 border-teal-500 text-white py-1 px-5 rounded" onClick={handleUpdate}>Update</button>
        </div>
    </div>
    </>
  )
}

export default UpdateForm
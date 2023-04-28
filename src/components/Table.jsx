import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useConfirm } from 'material-ui-confirm'
import { Delete, Edit } from '@mui/icons-material'
import CustomSnackbar from './CustomSnackbar'
import { SnackbarContext } from '../context/SnackbarContext'


function Table({filteredData, isSearch, setIsSearch}) {
    const {products, fetchProducts, isLoading } = useContext(GlobalContext)
    const {setOpen, setSeverity, setMessage} = useContext(SnackbarContext)
    useEffect (() => {
        fetchProducts()
    },[])

    const confirm =useConfirm()

    const onDelete = async (product) => {
        try {
            const response = await axios.delete(`https://api-project.amandemy.co.id/api/final/products/${product.id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
            )
            setOpen(true)
            setSeverity('success')
            setMessage(`berhasil menghapus produk : '${product.name}'`)
        } catch (error) {
            setOpen(true)
            setSeverity('error')
            setMessage('gagal melakukan delete produk')
            console.log(error.response.data)
        } finally {
            setIsSearch(false)
            fetchProducts()
        }
    }

    const handleDelete = async (product) => {
        try {
            await confirm({
                title: 'Yakin melakukan delete produk?',
                description: `produk '${product.name}' akan permanen dihapus`
            })
            onDelete(product)
        } catch (error) {
            console.log('delete produk dibatalkan')
        }
        finally {
            fetchProducts()
        }
    }

    const filteredProduct = filteredData.map ((product) => (
        <tr key={product.id}>
            <td className='px-2 py-1 border border-blue-300 text-center' >{product.id} </td>
            <td className='px-2 py-1 border border-blue-300  w-48 break-words'>{product.name} </td>
            <td className='px-2 py-1 border border-blue-300 text-center'>{product.is_diskon == true ? 'Aktif' : 'Mati'}</td>
            <td className='px-2 py-1 border border-blue-300'>{product.harga_display} </td>
            <td className='px-2 py-1 border border-blue-300'>{product.harga_diskon_display} </td>
            <td className='px-2 py-1 border border-blue-300'><img width={'200px'} src={product.image_url} />  </td>
            <td className='px-2 py-1 border border-blue-300  '>{product.category} </td>
            <td className='px-2 py-1 border border-blue-300'>
                <Link to={`/table/edit/${product.id}`}>
                <button 
                className='rounded bg-yellow-500 text-white px-2 py-1 mr-4'><Edit /></button>
                </Link>
                <button 
                onClick={() => handleDelete(product)}
                className='rounded bg-red-500 text-white px-2 py-1' alt="delete"><Delete /></button>
            </td>
        </tr>
    ))

    const listProduct = products.map (product => 
        <tr key={product.id}>
            <td className='px-2 py-1 border border-blue-300 text-center' >{product.id} </td>
            <td className='px-2 py-1 border border-blue-300  w-48 break-words'>{product.name} </td>
            <td className='px-2 py-1 border border-blue-300 text-center'>{product.is_diskon == true ? 'Aktif' : 'Mati'}</td>
            <td className='px-2 py-1 border border-blue-300'>{product.harga_display} </td>
            <td className='px-2 py-1 border border-blue-300'>{product.harga_diskon_display} </td>
            <td className='px-2 py-1 border border-blue-300'><img width={'200px'} src={product.image_url} />  </td>
            <td className='px-2 py-1 border border-blue-300  '>{product.category} </td>
            <td className='px-2 py-1 border border-blue-300'>
                <Link to={`/table/edit/${product.id}`}>
                <button 
                className='rounded bg-yellow-500 text-white px-2 py-1 mr-4'><Edit /> </button>
                </Link>
                <button 
                onClick={() => handleDelete(product)}
                className='rounded bg-red-500 text-white px-2 py-1'><Delete /> </button>
            </td>
        </tr>
    )

  return (
    <>
        <CustomSnackbar/>
        <table className='border-collapse'>
            <thead className='bg-teal-500 text-white'>
            <tr>
                <th className='px-2 py-1 border text-lg'>ID</th>
                <th className='px-2 py-1 border text-lg'>Nama Produk</th>
                <th className='px-2 py-1 border text-lg'>Keaktifan Diskon</th>
                <th className='px-2 py-1 border text-lg'>Harga</th>
                <th className='px-2 py-1 border text-lg'>Harga Diskon</th>
                <th className='px-2 py-1 border text-lg'>gambar</th>
                <th className='px-2 py-1 border text-lg'>Kategori</th>
                <th className='px-2 py-1 border text-lg'>Action</th>
            </tr>
            </thead>
            <tbody>
            {
            isLoading === true ? (
            <tr>
                <td className='py-4' colSpan={8}>
                <div className='mx-auto rounded-full w-14 h-14 bg-gradient-to-tr from-teal-500 to-rose-500 animate-spin'>
                    <div className='h-9 w-9 rounded-full bg-purple-200'></div>
                </div>
                </td>
            </tr> ) : isSearch === true && Object.keys(filteredData).length > 0 ? filteredProduct : isSearch === true && Object.keys(filteredData).length === 0 ? (
            <tr>
                <td className='py-4' colSpan={8}>
                <h1 className='text-teal-500 text-xl font-bold text-center'>yang Anda cari tidak ada</h1> 
                </td>
            </tr> ) : listProduct       }

                
            </tbody>
        </table>

    </>
  )
}

export default Table
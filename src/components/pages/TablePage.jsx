import React, { useContext,  useState } from 'react'
import Navbar from '../Navbar'
import Table from '../Table'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import SearchBar from '../SearchBar'
import { GlobalContext } from '../../context/GlobalContext'
import { Add } from '@mui/icons-material'


function TablePage() {
  const {products } = useContext(GlobalContext)
  
  const [filteredData, setFilteredData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const [input, setInput] = useState('')

  const [isSearch, setIsSearch] = useState(false)

  
  const onSearch = () => {
    if (selectedCategory) {
      if (input !== '') {
        const found = products.filter (
          (item) => item.category === selectedCategory && item.name.toLowerCase().includes(input.toLowerCase())
        ) 
        setFilteredData(found)
      } else {
        const found = products.filter (
          (item) => item.category === selectedCategory      
        ) 
        setFilteredData(found)
      }
    } else if (input !== '') {
      const found = products.filter (
        (item) => item.name.toLowerCase().includes(input.toLowerCase())   
      ) 
      setFilteredData(found)
    }
    else {
      setFilteredData(products)
    }
    setIsSearch(true)
  }

  const onReset = () => {
    setIsSearch(false)
    setSelectedCategory('')
    setInput('')
  }
  
  return (
    <>
    <Navbar/>
    <main>
      <div className='mx-4 min-h-screen'>
        <div className='lg:max-w-7xl mx-auto my-10'>
          <div>
            <h2 className="text-teal-500 text-xl font-bold mt-10">Table Products</h2>
          </div>
          <div className='flex justify-center'>
            <div className='mt-4'>
              <div className='flex justify-end'>
                <Link to={'/create'}>
                <button className='rounded border border-teal-700 text-teal-700 px-4 py-3 mb-4'>Create Product<Add /> </button>
                </Link>
              </div>
              <div className='flex justify-end gap-4 mb-4'>
                <SearchBar 
                  onSearch={onSearch}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  onReset={onReset}
                  input={input}
                  setInput={setInput}
                />
              </div>
              <Table 
                filteredData={filteredData}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
               />
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}

export default TablePage
import React from 'react'


function SearchBar({onSearch, onReset, selectedCategory, setSelectedCategory, input, setInput}) {  
  return (
    <>
       <select 
            className="border border-gray-200 px-4 rounded text-sm focus:bg-white focus:outline-none" 
            name='category'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} >
            <option  value='' >Filter Kategori</option>
            <option  value="teknologi">Teknologi</option>
            <option value="makanan">Makanan</option>
            <option  value="minuman">Minuman</option>
            <option value="hiburan">Hiburan</option>
            <option value="kendaraan">Kendaraan</option>
        </select>
        <input 
          type='text' 
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder='Masukkan nama produk '
          className='block text-sm focus:bg-white focus:outline-none appearance-none rounded shadow border border-gray-200 px-4'/>
        <button onClick={onSearch} className='rounded bg-teal-700 text-white px-6 py-2.5'>Search</button>
        <button onClick={onReset} className='rounded bg-red-500 text-white px-4 py-2.5'>Reset</button>
    </>
  )
}

export default SearchBar
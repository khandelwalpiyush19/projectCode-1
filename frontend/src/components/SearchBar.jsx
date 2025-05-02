import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Handle search functionality here
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="absolute right-0 top-0 mr-3 flex h-full items-center justify-center text-gray-500 hover:text-blue-600"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
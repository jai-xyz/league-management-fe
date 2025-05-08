import React from 'react'
import { Link } from 'react-router-dom'

const Teams = () => {
  return (
    <div>
      
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/admin/teams/add">Add Teams</Link>
      </button>
     
    </div>
  )
}

export default Teams

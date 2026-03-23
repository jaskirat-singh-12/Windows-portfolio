import React from 'react'

const Context = ({position}) => {
  if (!position.top) return ;

  return (
    <button
    style={position}
     className='bg-black border border-gray-500 rounded-md p-4 shadow-lg absolute text-white opacity-80 cursor-pointer '>
      Delete
    </button>
  )
}

export default Context




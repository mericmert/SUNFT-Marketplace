import React from 'react'
import Image from 'next/image'
import { FaEthereum } from 'react-icons/fa'

export default function ProfileInfo({user}) {
  return (
    <div className=" mt-10 mb-10 m-auto flex w-2/5 flex-col items-center">
      <div className="rounded-full overflow-hidden border-2 border-gray-700 cursor-pointer">
        <img
        src={user?.profilePicture ? user && `${user.profilePicture}`: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }
        className="w-28 h-28 overflow-hidden object-cover" />
      </div>
      <h1 className="text-3xl overflow-hidden text-gray-200">{user && user.username}</h1>
      <div className='flex items-center'>
        <FaEthereum className='text-gray-600' />
        <span className='text-gray-300'>{user && user.uAddress}</span>
      </div>
    </div>
  )
}

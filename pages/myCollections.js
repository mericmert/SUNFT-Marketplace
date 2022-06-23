import React from 'react'
import Layout from '../components/Layout'

const myCollections = () => {
  return (
    <div>
      <Layout>
        <div className="flex h-56  w-full flex-col items-center justify-center rounded-xl p-4 pt-20 text-center font-main-font">
          <h1 className=" text-4xl font-bold text-white">My Collections</h1>
          <p className=" pt-3  font-main-font text-gray-400">
            Create, curate, and manage collections of unique NFTs to share and
            sell.
          </p>
          <a href='/createCollection'>
            <button className="mt-12 flex h-10 w-48 items-center justify-center gap-x-3 overflow-hidden rounded-md bg-pink-500 p-6 text-center text-white  hover:bg-pink-700">
                <p>Create a collection</p>
            </button>
          </a>
        </div>
      </Layout>
    </div>
  )
}

export default myCollections

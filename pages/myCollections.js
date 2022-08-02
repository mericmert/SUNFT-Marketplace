import React from 'react'
import Layout from '../components/Layout'
import CollectionCard from "../components/CollectionCard";
import Link from 'next/link';

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
          <div className='flex mt-12 gap-x-2 flex-row flex-wrap w-5/6'>
            {/*{collections.map((collection,idx) => {*/}
            {/*  return  <CollectionCard key={idx} img_src={${ImagePath}${collection.collectionImage}} name={collection.name} owner={collection.owner} description={collection.description} />*/}
            {/*})}*/}
          </div>
          <Link href='/createCollection'>
            <a>
              <button className="mt-12 flex h-10 w-48 items-center justify-center gap-x-3 overflow-hidden rounded-md bg-pink-500 p-6 text-center text-white  hover:bg-pink-700">
                <p>Create a collection</p>
              </button>
            </a>
          </Link>
        </div>
      </Layout>
    </div>
  )
}

export default myCollections

//initialprops

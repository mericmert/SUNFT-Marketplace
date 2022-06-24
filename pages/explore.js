import React from 'react'
import Layout from '../components/Layout'
import Tabs from '../components/Tabs'
import NFTCollectionCategoryHelper from "../backendHelpers/NFTCollectionCategoryHelper";


const explore = ({ categories }) => {
  return (
    <div>
      <Layout>
        <h1 className='font-semibold text-white text-center text-5xl m-12 pt-14'>
              Explore Collections
        </h1>
        <Tabs categories={categories} />
      </Layout>
    </div>
  )
}

export async function getStaticProps(context) {
    const categories = await NFTCollectionCategoryHelper.findMany({});
    return {
        props: {categories: JSON.stringify(categories) }, // will be passed to the page component as props
    }
}


export default explore

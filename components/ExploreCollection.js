import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import NFTCollectionCategoryHelper from "../backendHelpers/NFTCollectionCategoryHelper";
import { ImagePath } from '../VARIABLES';
const CollectionCard = dynamic(
  () => {
    return import('../components/CollectionCard')
  },
  { ssr: false }
)

const Categories = new NFTCollectionCategoryHelper();

const ExploreCollection = ({ categoryName }) => {

  const [collections, setCollections] = useState([]);

  
  const getData = () => {
    Categories.find(categoryName).then(category => {
      category.getNFTCollections().then(collections => {
        setCollections(collections);
      });
    });
  }

  useEffect(()=>{
    getData();
  },[])
  

  return (
    <div>
      <div className="container my-12 mx-auto px-6">
        <section className="mb-32">

          <div className="grid gap-6 gap-y-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-12">
            {collections.map((collection,idx) => {
              return <CollectionCard key={idx} img_src={`${ImagePath}${collection.collectionImage}`} name={collection.name} owner={collection.owner} description={collection.description}/>
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ExploreCollection

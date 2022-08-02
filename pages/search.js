import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import ProfileCard from '../components/ProfileCard'
import SearchCollectionCard from '../components/SearchCollectionCard'
import nftData from '../mock_data/item_data.json'
import Router,{ useRouter } from 'next/router'
import {APIPath} from '../VARIABLES'

const search = ({nfts,collections,text}) => {
    const router = useRouter()
    const { username } = router.query
    const [filter, setFilter] = useState({
      s: text,
      sort: '',
    })
    const [filteredNFTS, setFilteredNFTS] = useState(nfts)
    const [all_nfts, setAll_nfts] = useState(nfts)
    const [filteredCollections, setFilteredCollections] = useState(collections)
    const [all_collections, setAll_collections] = useState(collections)

    useEffect(() => {
      let nftcontent = all_nfts.filter(
        (nft) => nft.name.toLowerCase().indexOf(filter.s.toLowerCase()) >= 0
      )
      let collectioncontent = all_collections.filter(
        (collection) => collection.name.toLowerCase().indexOf(filter.s.toLowerCase()) >= 0
      )
      setFilteredNFTS(nftcontent)
      setFilteredCollections(collectioncontent)
    }, [filter])

  return (
    <div>
      <Layout>

      <h1 className='font-semibold text-white text-3xl text-center m-12 pt-14'>
              Collection results
        </h1>


        <div className="container mt-10 mb-4 mx-auto justify-center items-center flex pt-10">
          <section className="text-gray-800">
            <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
              {filteredCollections.map((collection,idx) => {
                console.log(collection.collectionImage)
                return (
                  <SearchCollectionCard
                    key={idx}
                    name={collection.name}
                    owner={collection.owner}
                    image={collection.collectionImage}
                    desc={collection.description}
                    likes={collection.numLikes}
                  />
                )
              })}



            </div>
          </section>
        </div>


        <h1 className='font-semibold text-white text-3xl text-center my-3 pt-4'>
              Single items
        </h1>

          <div className="container my-6 mx-auto flex justify-center pt-4">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNFTS.map((nft) => {
                console.log(nft);
                return (
                <ProfileCard
                  key={nft.id}
                  username={nft.owner}
                  title={nft.name}
                  image={`${nft.nftFile}`}
                  like={nft.numLikes}
                  eth_price={24}
                  desc={nft.description}
                  uid={nft.UID}
                  idx={nft.index}
                />
                )
                })}
            </div>
          </div>
      </Layout>
    </div>
  )
}

export default search

export async function getServerSideProps(context){
  const searchText = context.query.searchText;
  let collectionList, nftList
  await fetch(`${APIPath}/nftcollections`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(res => {
    return res.json()
  })
  .then(collection_data => {
    collectionList = collection_data;
  })
  await fetch(`${APIPath}/nfts/`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(res => {
    return res.json()
  })
  .then(nft_data => {
    nftList = nft_data
  })
  return {
    props : {
      text: searchText,
      collections : collectionList,
      nfts : nftList,
    }
  }
}

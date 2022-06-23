import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import ProfileCard from '../../components/ProfileCard'
import { MdAddCircleOutline } from 'react-icons/md'
import { useRouter } from 'next/router'
import NFTCollectionHelper from '../../backendHelpers/NFTCollectionHelper'
import { ImagePath } from '../../VARIABLES'
import Link from 'next/link'
const Collections = new NFTCollectionHelper()

const collection = ({ collectionName }) => {
  const router = useRouter()

  const [filter, setFilter] = useState({
    s: '',
    sort: '',
  })
  const [filteredProducts, setFilteredProducts] = useState([])
  const [products, setProducts] = useState([])
  const [token, setToken] = useState('s')
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    Collections.find(collectionName).then((collection) => {
      setCollection(collection)
      collection.getNFTs().then((NFTs) => {
        NFTs = NFTs.map((nft, indx) => ({ ...nft, price: indx * 8 + 13 }))

        setProducts(NFTs)
        setFilteredProducts(NFTs)
        console.log(NFTs)
      })
    })
  }, [setProducts, setFilteredProducts])

  useEffect(() => {
    let content = products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(filter.s.toLowerCase()) >= 0
    )
    if (filter.sort === 'asc' || filter.sort === 'desc') {
      content.sort((a, b) => {
        const diff = a.price - b.price
        if (diff === 0) return 0
        const sign = Math.abs(diff) / diff
        return filter.sort === 'asc' ? sign : -sign
      })
    }
    if (filter.sort === 'fav') {
      content.sort((a, b) => {
        const diff = a.like_number - b.like_number
        if (diff === 0) return 0
        const sign = Math.abs(diff) / diff
        return -sign
      })
    }
    setFilteredProducts(content)
  }, [filter])

  const handleSearch = (st) => {
    setFilter({ ...filter, s: st })
  }
  const handleChange = (val) => {
    setFilter({ ...filter, sort: val })
  }

  return (
    <div>
      <Layout>
        <div className="overflow-hidden">
          <img
            className="h-64 w-full object-cover"
            src={
              collection && `${ImagePath}${collection.collectionImage}`
            }
            alt="banner"
          ></img>
        </div>
        <div className="w-screen px-4">
          <div className="flex w-full justify-center text-white">
            <img
              className="mt-[-4rem] h-28 w-28 rounded-full border-2 border-[#202225] object-cover sm:h-36 sm:w-36"
              src={
                products &&
                `${ImagePath}${
                  products[Math.floor(Math.random() * products.length)]?.nftFile
                }`
              }
              alt="profile image"
            ></img>
          </div>

          <div className="flex w-full justify-center text-white">
            <div className="mb-4 text-4xl font-bold sm:text-5xl">
              {collection && collection.name}
            </div>
          </div>

          <div className="flex w-full justify-center text-white">
            <div className="mb-4 text-lg">
              Created by{' '}
              <Link href={`/profile/${collection && collection.owner}`}>
                <a>
                  <span className="text-[#2081e2]">
                    {collection && collection.owner}
                  </span>
                </a>
              </Link>
            </div>
          </div>

          <div className="flex w-full justify-center text-white">
            <div className="w-max-1/4 mt-4 flex-wrap overflow-hidden break-words px-3 pb-7 text-center text-base text-[#8a939b] md:px-20 md:text-lg lg:px-52">
              {collection && collection.description}
            </div>
          </div>

          <div className="flex w-full justify-center text-white">
            <div className="mx-10 mb-6 flex text-lg">
              <div className="w-36">
                <button>
                  <div className="container flex justify-between rounded-lg border px-2 text-center text-gray-400 hover:text-white focus:text-white">
                    <div className="my-2">Add Watchlist</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center text-white">
            <div className="mt-12 grid grid-rows-2 gap-2 sm:grid-cols-2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="block w-full rounded-lg border border-black bg-[#363840] p-2.5 pl-10 text-sm text-white focus:ring-pink-400"
                    placeholder="Search"
                    required=""
                    onKeyUp={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="ml-2 rounded-lg border border-pink-500 bg-pink-500 p-2.5 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-900"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </form>

              <div className="">
                <select
                  onChange={(e) => handleChange(e.target.value)}
                  id="sortByPrice"
                  className="block w-full rounded-lg border border-black bg-[#363840] p-2.5 text-sm text-gray-400 focus:ring-pink-400 "
                >
                  <option selected="">Sort by</option>
                  <option value="desc">Price: High to Low</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="fav">Most Favorited</option>
                </select>
              </div>
            </div>
          </div>

          <div className="container my-6 mx-auto flex justify-center">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((nft) => (
                <ProfileCard
                  key={nft.id}
                  uid={nft.UID}
                  idx={nft.index}
                  username={nft.creator}
                  title={nft.name}
                  like={nft.numLikes}
                  eth_price={nft.price}
                  image={`${ImagePath}${nft.nftFile}`}
                  desc={nft.description}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default collection

export async function getServerSideProps(context) {
  console.log(context)
  return {
    props: { collectionName: context.params.collectionName },
  }
}

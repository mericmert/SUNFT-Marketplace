import Layout from '../../../components/Layout'
import { FaEthereum } from 'react-icons/fa'
import { FcAbout } from 'react-icons/fc'
import { MdFavorite } from 'react-icons/md'
import { BiPurchaseTag } from 'react-icons/bi'
import { RiHistoryLine } from 'react-icons/ri'
import React, {useContext, useEffect, useState} from 'react'
import NFTHelper from '../../../backendHelpers/NFTHelper'
import { ImagePath } from '../../../VARIABLES'
import NFT from '../../../objects/NFT'
import Link from 'next/link'
import Modal from '../../../components/Modal'
import {AiOutlineUnorderedList} from 'react-icons/ai'
import {AuthContext} from "../../../context/authContext";



const price = Math.floor(Math.random() * (250 - 10)) + 10
const APIKEY = 'apikey 6rdxFXUqMwsvE6293Wccbz:1HYPOFigQ31hydZ74e0ye7'
function Nft({ data }) {
  const { Owner, Creator, UID, index, nftObject } = JSON.parse(data);
  const [equivalentPrice, setEquivalentPrice] = useState(0)
  const nftobj = new NFT(nftObject);
  const [likes, setLikes] = useState(nftobj.numLikes)
  const [isLiked, setIsLiked] = useState(false);
  const [uAddress, setUAddress] = useState();

  const getInitialLike = async () => {
    const liked = await nftobj.isLikedBy(uAddress);
    setIsLiked(liked);
    }


  useEffect(() => {
    getInitialLike();
    setUAddress(JSON.parse(localStorage.getItem("state")).uAddress);
  }, []);

  const handleLikeClick = async () =>  {
    if (isLiked) {
      setLikes(likes-1);
      setIsLiked(false)
      await nftobj.dislike(uAddress)

    } else {
      setLikes(likes+1)
      setIsLiked(true)
      await nftobj.like(uAddress)

    }
  }


  /*useEffect(() => {
        (async () =>{
            await fetch(`https://api.collectapi.com/economy/currencyToAll?int=${price}&base=TRY`,{
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    "authorization" : APIKEY
                }
            })
            .then((res) => {
                return res.json()
            })
            .then(response => {
                setEquivalentPrice(response.result.data[51].calculatedstr)
            })
        })()
    },[price])*/

  return (
    <Layout>
      <div className="m-auto flex h-full w-5/6 flex-col gap-y-4 overflow-hidden rounded-md sm:w-3/4  ">
        <div className="flex flex-col items-center justify-start gap-x-4 sm:flex-row">
          <div>
            <div className="text-center text-sm">
              <p className="text-gray-400">
                Created by{' '}
                <span className="text-indigo-500">{Creator.username}</span>
              </p>
            </div>
            <img
              className="h-96 w-[32rem] rounded-lg object-cover"
              src={nftobj && `${ImagePath}${nftobj.nftFile}`}
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="my-4 flex flex-col justify-center text-center  sm:my-0 md:text-left">
              <Link href={`/collection/${nftobj.collectionName}`}>
                <a>
                  <h1 className="text-primary-color-5">
                    {nftobj.collectionName}
                  </h1>
                </a>
              </Link>
              <h1 className="text-xl font-semibold text-gray-200">
                {nftobj.name}
              </h1>
              <p className="text-gray-400">
                Owned by{' '}
                <Link href={`/profile/${Owner.username}`}>
                  <a>
                    <span className="text-primary-color-5">
                      {Owner.username}
                    </span>
                  </a>
                </Link>
              </p>
            </div>
            <div className="flex h-64 w-full flex-col items-center justify-center gap-y-1 rounded-lg  bg-[#231e28] p-4 shadow-lg shadow-[#17141b]  md:items-start">
              <h1 className=" text-gray-400 sm:text-sm">Highest offer</h1>
              <div className="flex">
                <FaEthereum className="text-xl text-primary-color-5" />
                <p className="text-lg text-gray-200">{`${price} (${equivalentPrice}$)`}</p>
              </div>

              <div className="">

               <Modal></Modal>
              </div>

              

              <div className="flex items-center gap-x-8">
                <div className="flex items-center gap-x-2">
                  <button onClick={() => handleLikeClick()}>
                    <MdFavorite
                      className={
                        'text-2xl ' +
                        (!isLiked ? 'text-gray-400' : 'text-primary-color-5')
                      }
                    />
                  </button>
                  <p className="text-sm text-gray-200">{likes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-[#231e28] md:col-span-3 md:col-start-4 md:row-span-1">
          <div className="flex h-10 w-full items-center gap-x-2 bg-[#17141b] p-2">
            <FcAbout />
            <h1 className="text-lg font-semibold text-gray-100">Description</h1>
          </div>
          <p className="p-2 text-gray-200">{nftobj.description}</p>
        </div>
        <div className="row-start-3 mb-2 h-64 overflow-y-auto rounded-lg bg-[#231e28] md:col-span-3">
          <div className="flex h-10 w-full items-center gap-x-2 bg-[#17141b] p-2 text-indigo-500">
            <RiHistoryLine />
            <p className="font-semibold text-gray-300">Transactions</p>
          </div>
        </div>
        <div className="row-start-3 mb-4 h-64 overflow-y-auto rounded-lg bg-[#231e28] md:col-span-3">
          <div className="flex h-10 w-full items-center gap-x-2 bg-[#17141b] p-2 text-indigo-500">
            <AiOutlineUnorderedList />
            <p className="font-semibold text-gray-300">Offers</p>
          </div>
          <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                From
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b transition duration-300 ease-in-out">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                1
                </td>
              <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
              <div className='flex'>
                <FaEthereum className="mt-2 ml-1 text-xl text-white" />
                        <p className="mt-2 ml-1 text-base text-white"> 0.250 ETH</p>
                      </div>
              </td>
              
              <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
            </tr>
          
            <tr class="border-b transition duration-300 ease-in-out ">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
              2
              </td>
              <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
              <div className='flex'>
                <FaEthereum className="mt-2 ml-1 text-xl text-white" />
                        <p className="mt-2 ml-1 text-base text-white"> 0.345 ETH</p>
                      </div>
              </td>
              
              <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { UID, index } = context.query
  const NFT = await NFTHelper.find(UID, index)
  const Owner = await NFT.getOwner()
  const Creator = await NFT.getCreator()
  return {props: {data: JSON.stringify({UID, index, nftObject: NFT, Creator, Owner})}}
}

export default Nft

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import NFTCollectionHelper from '../backendHelpers/NFTCollectionHelper';
import UserHelper from '../backendHelpers/UserHelper';
import {useSelector} from "react-redux";

function TopCollectionCard({collection, idx}) {
    const [isWatched, setIsWatched] = useState(false);
    const uAddress = useSelector(state => state.uAddress);
    useEffect(() => {
        (async () => {
            const _isWatched = await NFTCollectionHelper.isWatchListedBy(uAddress, collection.name)
            setIsWatched(_isWatched);
        })()
    },[])
    const handleWatchList = async () => {
        if (isWatched) {
          setIsWatched(false);
          await UserHelper.removeWatchList(uAddress, collection.name);
        }
        else {
          setIsWatched(true);
          await UserHelper.addWatchList(uAddress, collection.name);
        }
      }
    return (
        <tr className="border-b border-primary-color-6 transition duration-300 ease-in-out hover:bg-primary-color-hover">
          <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-white">
            <Link href={`/collection/${collection.address}`}>
              <a>
                <div className="flex items-center space-x-2">
                  <div className="space-y-1 font-medium">
                    <div>{idx + 1}</div>
                  </div>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`${collection.collectionImage}`}
                    alt=""
                  />
                  <div className="space-y-1 font-medium">
                    <div>{collection.name}</div>
                  </div>
                </div>
              </a>
            </Link>
          </td>

          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-light text-white">
            <button onClick={handleWatchList}>
              <div className="container flex justify-between rounded-lg border px-2 text-center text-gray-400 hover:text-white focus:text-white">
                <div className="my-2">
                  {!isWatched ? 'Add' : 'Remove'} Watchlist
                </div>
              </div>
            </button>
          </td>
        </tr>
    )
}

export default TopCollectionCard

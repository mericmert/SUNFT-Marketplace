import React, { useEffect, useState } from 'react'
import { ImagePath } from '../VARIABLES'
import Link from 'next/link'
import NFTHelper from '../backendHelpers/NFTHelper';
import NFTCollectionHelper from '../backendHelpers/NFTCollectionHelper';
function TopCollectionCard({collection, idx}) {
    const [isWatched, setIsWatched] = useState(false);
    useEffect(() => {
        setIsWatched(NFTCollectionHelper.isWatchListedBy(JSON.parse(localStorage.getItem("state"))?.uAddress), collection.name);
    }, [])
    console.log(isWatched);
    return (
        <tr className="border-b border-primary-color-6 transition duration-300 ease-in-out hover:bg-primary-color-hover">
          <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-white">
            <Link href={`/collection/${collection.name}`}>
              <a>
                <div className="flex items-center space-x-2">
                  <div className="space-y-1 font-medium">
                    <div>{idx + 1}</div>
                  </div>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`${ImagePath}${collection.collectionImage}`}
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
            <button>
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
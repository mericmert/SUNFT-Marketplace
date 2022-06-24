import React, { useEffect, useState} from 'react'
import NFTCollectionHelper from '../backendHelpers/NFTCollectionHelper'
import { APIPath } from '../VARIABLES';
import Link from 'next/link';

const TopCollections = () => {
  const [TopCollections, setTopCollections] = useState([]);
  useEffect(() => {
    (async () => {
      var collections = await NFTCollectionHelper.findMany({});
      console.log(collections);
      setTopCollections(collections.slice(0,5));
    }
    )()
  },[])

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <h1 className="pt-20 pb-10 text-center text-3xl font-semibold text-white">
            Top collections
          </h1>
          <div className="inline-block min-w-full py-2 px-12 md:px-60 ">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <tbody>
                  {TopCollections.map((collection, idx) => {
                    return (
                      <tr className="border-b border-primary-color-6 transition duration-300 ease-in-out hover:bg-primary-color-hover">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-white">
                          <Link href="/">
                          <a>
                            <div className="flex items-center space-x-2">
                              <div className="space-y-1 font-medium">
                                <div>{idx + 1}</div>
                              </div>
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2F7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ%3Ds10000?fit=max&h=120&w=120&auto=format&s=65b159799dcff448deaf9106b1ead13e"
                                alt=""
                              />
                              <div className="space-y-1 font-medium">
                                <div>collection.name</div>
                              </div>
                            </div>
                          </a>
                          </Link>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-light text-white">
                          <button>
                            <div className="container flex justify-between rounded-lg border px-2 text-center text-gray-400 hover:text-white focus:text-white">
                              <div className="my-2">Add Watchlist</div>
                            </div>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopCollections



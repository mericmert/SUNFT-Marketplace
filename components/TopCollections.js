import React, { useEffect, useState} from 'react'
import NFTCollectionHelper from '../backendHelpers/NFTCollectionHelper'
import { APIPath } from '../VARIABLES';
import TopCollectionCard from '../components/TopCollectionCard'

const TopCollections = () => {
  const [TopCollections, setTopCollections] = useState([]);
  const [watchListed, setWatchListed] = useState(false);

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
                    {TopCollections.map((collection, idx) => <TopCollectionCard collection={collection} idx={idx}/>
                    )}
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



import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import UserHelper from "../backendHelpers/UserHelper";

const Table = dynamic(
  () => {
    return import('../components/Table')
  },
  { ssr: false }
)

const watchList = () => {
    const [watchLists, setWatchLists] = useState([]);
    useEffect(() => {
        (async () => {
            let _watchLists = await UserHelper.getWatchLists(JSON.parse(localStorage.getItem("state")).uAddress);
            setWatchLists(_watchLists);
        })();
    }, []);
    const handleTableItemClick = async () => {
        let _watchLists = await UserHelper.getWatchLists(JSON.parse(localStorage.getItem("state")).uAddress);
        setWatchLists(_watchLists);
    }
  return (
    <div>
      <Layout>
        <h1 className="m-12 pt-14 text-center text-4xl font-semibold text-white">
          My Watchlist
        </h1>
        <div className="m-20">
         <Table watchLists={watchLists} handleClick={handleTableItemClick} />
        </div>
      </Layout>
    </div>
  )
}

export default watchList;

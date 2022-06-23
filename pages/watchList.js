import React from 'react'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const Table = dynamic(
  () => {
    return import('../components/Table')
  },
  { ssr: false }
)

const watchList = () => {
  return (
    <div>
      <Layout>
        <h1 className="m-12 pt-14 text-center text-4xl font-semibold text-white">
          My Watchlist
        </h1>
        <div className="m-20">
         <Table></Table>
        </div>
      </Layout>
    </div>
  )
}

export default watchList

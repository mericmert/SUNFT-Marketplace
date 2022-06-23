import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ProfileCard from '../components/ProfileCard'

import {AuthContext} from "../context/authContext";

import UserHelper from "../backendHelpers/UserHelper";
import { ImagePath } from "../VARIABLES";

const Users = new UserHelper();

const favorites = () => {
    const { state, dispatch } = useContext(AuthContext);
    const [likes, setLikes] = useState([])

    useEffect(() => {
        Users.find({ uAddress: state.uAddress }).then(user => {
            user.getLikes().then(lk => {
                setLikes(lk);
            })
        })
    }, [])
  return (
    <div>
      <Layout>
        <h1 className="m-12 pt-14 text-center text-4xl font-semibold text-white">
          My Favorites
        </h1>

        <div className="container my-24 mx-auto flex justify-center">

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {likes.map((nft) => (
                    <ProfileCard
                    key={nft.id}
                    username={nft.username}
                    title={nft.title}
                    like={nft.numLikes}
                    eth_price={5}
                    image={`${ImagePath}${nft.nftFile}`}
                    desc={nft.description}
                    />
                ))}
            </div>

        </div>
      </Layout>
    </div>
  )
}

export default favorites

import React, { useEffect, useState } from 'react'
import { IoIosSettings } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'
import { BsFillEyeFill } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { HiUser } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import { BsCollection } from 'react-icons/bs'

import Link from 'next/link';
import {AuthContext} from "../context/authContext";

const Dropdown = () => {

  const [state, setState] = useState({});
  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("state")));
  }, []);

  return (
    <div>
      <div className="dropdown group relative cursor-pointer flex justify-center">
        <Link href={`/profile/${state.uAddress}`}>
          <a>
            <CgProfile />
          </a>
        </Link>
        <div className="dropdown-menu absolute hidden h-auto group-hover:block pt-11">
          <ul className="top-0 w-52 bg-[#18191c] px-6 pt-4 text-gray-400 shadow">
            <li className="pb-4 text-lg font-normal ">
              <Link href={`/profile/${state.uAddress}`}>
                <a
                  className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-primary-color-4 hover:text-white"
                >
                  <HiUser className="mr-3 h-6 w-6" />
                  Profile
                </a>
              </Link>
            </li>

            <li className="pb-4 text-lg font-normal">
              <Link href={"/favorites"}>
              <a
                className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-primary-color-4 hover:text-white"
              >
                <AiOutlineHeart className="mr-3 h-6 w-6" />
                Favorites
              </a>
              </Link>
            </li>

            <li className="pb-4 text-lg font-normal">
              <Link href={"/watchList"}>
              <a
                className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-primary-color-4 hover:text-white"
              >
                <BsFillEyeFill className="mr-3 h-6 w-6" />
                Watchlist
              </a>
              </Link>
            </li>

            <li className="pb-4 text-lg font-normal">
              <Link href={"/myCollections"}>
              <a
                className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-primary-color-4 hover:text-white"
              >
                <BsCollection className="mr-3 h-6 w-6" />
                My Collections
              </a>
              </Link>
            </li>

            <li onClick={() => {localStorage.clear()}} className="pb-4 text-lg font-normal">
              <Link  href="/">
                <a
                    className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-primary-color-4 hover:text-white"
                >
                  <FiLogOut className="mr-3 h-6 w-6" />
                  Logout
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dropdown

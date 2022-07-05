import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { BsFillEyeFill, BsCollection } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { HiUser } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import { useSelector, useDispatch } from 'react-redux'

import Link from 'next/link';
import {logout} from "../slices/authSlice";

const Dropdown = () => {

  const uAddress = useSelector(state => state.uAddress);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="dropdown group relative cursor-pointer flex justify-center">
        <Link href={`/profile/${uAddress}`}>
          <a>
            <CgProfile />
          </a>
        </Link>
        <div className="dropdown-menu absolute hidden h-auto group-hover:block pt-11">
          <ul className="top-0 w-52 bg-[#18191c] px-6 pt-4 text-gray-400 shadow">
            <li className="pb-4 text-lg font-normal ">
              <Link href={`/profile/${uAddress}`}>
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

            <li onClick={() => {dispatch(logout())}} className="pb-4 text-lg font-normal">
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

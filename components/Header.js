import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import sabanciLogo from '../public/assets/sabanci.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiWalletAlt } from 'react-icons/bi'
import Dropdown from './Dropdown'
import Router from 'next/router'

const style = {
  wrapper: `bg-[#18191c] h-16 w-screen px-[1.5rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: `hidden md:inline ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `text-xs flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: `flex items-center justify-end`,
  headerItem: `md:block text-gray-300 px-4 font-semibold hover:text-white cursor-pointer`,
  headerIcon: `md:block text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = () => {
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    Router.push({
      pathname: '/search',
      query: { searchText: text },
    })
  }

  return (
    <div className="header-container">
      <div className={style.wrapper}>
        <Link href="/">
          <div className={style.logoContainer}>
            <Image src={sabanciLogo} height={40} width={90}></Image>
            <div className={style.logoText}>SU NFT</div>
          </div>
        </Link>
        <div className={style.searchBar}>
          <div className={style.searchIcon}>
            <AiOutlineSearch></AiOutlineSearch>
          </div>
          <form onSubmit={handleSearch}>
            <input
              onChange={handleChange}
              className={style.searchInput}
              placeholder="Search items and collections"
            ></input>
          </form>
        </div>
        <div className={style.headerItems}>
          <div className="relative h-9 w-9">
            <input
              className="absolute top-0 left-0 z-10 h-9 w-9 opacity-0 md:hidden"
              type="checkbox"
            />
            <div className="flex h-9 w-9 flex-col items-center justify-between md:hidden">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="hamburger-menu">
              <div className={style.headerItem}>
                <Link href="/explore">
                  <a>Explore</a>
                </Link>
              </div>
              <div className={style.headerItem}>
                <Link href="/CreateNFT">
                  <a>Create</a>
                </Link>
              </div>
              <div className={style.headerIcon}>
                <Dropdown></Dropdown>
              </div>
              <div className={style.headerIcon}>
                <Link href="/login">
                  <a>
                    <BiWalletAlt />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:items-center">
            <div className={style.headerItem}>
              <Link href="/explore">
                <a>Explore</a>
              </Link>
            </div>
            <div className={style.headerItem}>
              <Link href="/CreateNFT">
                <a>Create</a>
              </Link>
            </div>
            <div className={style.headerIcon}>
              <Dropdown></Dropdown>
            </div>
            <div className={style.headerIcon}>
              <Link href="/login">
                <a>
                  <BiWalletAlt />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

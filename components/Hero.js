import React, { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

const style = {
  wrapper: `relative`,
  container: `p-5 before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/n6T7r8uFDRemSy_6cCW3mXKwTxQw-FVecJY4iH1vnoskHoOQMhGz5sdAePh0ON_zTWAzst4HSoPuP4TlR0FlrnpfQk2-e1RveEmgBQ=w720')] before:bg-cover before:bg-center before:opacity-800 before:blur-lg before:brightness-50`,
  contentWrapper: `flex  relative justify-center flex-wrap items-center`,
  copyContainer: `w-3/4 sm:w-1/2`,
  title: `text-center sm:text-left relative text-white text-[46px] font-semibold`,
  description: `text-center sm:text-left text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex justify-center sm:justify-start items-center gap-x-8`,
  accentedButton: `w-32 sm:w-48 h-14 relative text-lg font-semibold px-8 sm:px-12 py-4 text-gray-100 bg-gradient-to-r from-indigo-500 to-primary-color-5 rounded-md`,
  button: `w-32 sm:w-48 h-14 relative text-lg font-semibold px-8 sm:px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `mt-6 w-[32rem] rounded-[3rem]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center justify-center sm:justify-start text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

const Hero = () => {

  return (
    <section>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.contentWrapper}>
            <div className={style.copyContainer}>
              <div className={style.title}>
                Discover all the NFTs of Sabancı University students!
              </div>
              <div className={style.description}>
                SUNFT is the NFT marketplace of the Sabancı University .
              </div>
              <div className={style.ctaContainer}>
                <a href="/explore">
                  <button className={style.accentedButton}>Explore</button>
                </a>
                <a href="/createItem">
                  <button className={style.button}>Create</button>
                </a>
              </div>
            </div>
            <div className={style.cardContainer}>
              <img
                className="rounded-t-lg"
                src="https://lh3.googleusercontent.com/n6T7r8uFDRemSy_6cCW3mXKwTxQw-FVecJY4iH1vnoskHoOQMhGz5sdAePh0ON_zTWAzst4HSoPuP4TlR0FlrnpfQk2-e1RveEmgBQ=w720"
                alt=""
              />
              <div className={style.infoContainer}>
                <img
                  className="h-[3rem] rounded-full object-contain"
                  src="/assets/hero-avatar.jpg"
                  alt=""
                />
                <div className={style.author}>
                  <div className={style.name}></div>
                  <a
                    className="text-[#1868b7]"
                    href="#"
                  >
                    Frontend Team + Isiktan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

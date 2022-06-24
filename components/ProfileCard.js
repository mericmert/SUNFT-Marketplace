import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { MdFavorite } from 'react-icons/md'
import { FaEthereum } from 'react-icons/fa'
import Link from 'next/link'
import {useEffect, useState} from "react";
import UserHelper from "../backendHelpers/UserHelper";

const style = {
  container:
    'w-80 sm:w-72 bg-[#313338] rounded-md shadow-sm shadow-gray-900 font-main-font hover:shadow-md hover:shadow-primary-color-4',
  image_container: 'w-full p-2 h-72',
  image: 'h-full w-full object-fit rounded-sm',
  content: 'flex flex-col justify-evenly p-2',
  user_info: 'flex items-center space-x-1',
  name_price: 'flex justify-between',
  button_like: 'flex justify-between mt-0.5',
  button:
    'text-gray-100 bg-gradient-to-r from-indigo-500 to-primary-color-5 w-24 rounded-md',
}

export default function ProfileCard({
  currentOwner,
  title,
  like,
  eth_price,
  image,
  desc,
  uid,
  idx
}) {
  const [username, setUsername] = useState("");
  useEffect(() => {
    (async() => {
      const _username = await UserHelper.find({uAddress: currentOwner});
      setUsername(_username.username);
    })();
  }, []);
  return (
      <div className={style.container}>
        <Link href={`/nft/${uid}/${idx}`}>
          <a>
            <div className={style.image_container}>
              <img src={image} className={style.image}/>
            </div>
          </a>
        </Link>
        <div className={style.content}>
          <div className={style.user_info}>
            <CgProfile className="text-md text-primary-color-5"/>
            <Link href={`/profile/${username}`}>
              <a>
              <span className="font-main-font text-sm text-gray-400">
                {username}
              </span>
              </a>
            </Link>
          </div>
          <div className={style.name_price}>
            <span className="text-gray-200">{title}</span>
            <div className="flex items-center space-x-1">
              <FaEthereum className="text-gray-400 "/>
              <span className="text-sm text-gray-100">{eth_price}</span>
            </div>
          </div>
          <div className={style.button_like}>
            <div className="flex items-center space-x-1">
              <MdFavorite className="text-primary-color-5"/>
              <span className="text-gray-200">{like}</span>
            </div>
            <button className={style.button}>Bid</button>
          </div>
        </div>
      </div>
  )
}

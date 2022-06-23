import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import {ImagePath} from "../VARIABLES";

const SearchCollectionCard = (props) => {
  return (
    <div>
      <div className="container my-8 mx-auto">
        <section className="mb-2 text-center text-white">
          <div className="mb-2 md:mb-0">
            <div className="block h-full w-80 rounded-lg bg-primary-color-6 shadow-md shadow-black">
              <div className="flex justify-center">
                <div className="-mt-16 flex justify-center">
                  <img
                    src={`${ImagePath}${props.image}`}
                    className="mx-auto w-32 h-32 rounded-full shadow-lg shadow-black"
                    alt=""
                  />
                </div>
              </div>
              <div className="p-6">
                <h5 className="mb-1 text-lg font-bold">{props.name}</h5>
                <p className="mb-6 font-medium">
                  Owned by{' '}
                  <span className="font-bold text-purple-400 ">
                    {props.owner}
                  </span>
                </p>

                <div className="flex w-full justify-center text-white">
                  <div className="mb-4 flex w-[65vw] justify-between rounded-xl border border-[#151b22] py-4 px-2">
                      {props.desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SearchCollectionCard

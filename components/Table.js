import React from 'react';
import 'flowbite'
import UserHelper from "../backendHelpers/UserHelper";
import {ImagePath} from "../VARIABLES";
import {useSelector} from "react-redux";


const Table = ({ watchLists, handleClick }) => {
  const uAddress = useSelector(state => state.uAddress);
  const handleButtonClick = (idx) => async () => {
    await UserHelper.removeWatchList(uAddress, watchLists[idx].collectionName);
    handleClick();
  }

  return (
    <div>
      <div className="relative overflow-x-auto flex justify-center">
        <table className="w-96 table-auto text-base text-white">
          <thead className=" text-lg text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Collection
              </th>

              <th scope="col" className="px-2 py-3"></th>
            </tr>
          </thead>

          <tbody>
          {watchLists.map((watchList, idx) => (
              <tr key={`watchlist-${idx}`}className="border-b border-black hover:bg-primary-color-hover">
                <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  <a href="/">
                    <div className="flex items-center space-x-2">
                      <img
                          className="h-10 w-10 rounded-full"
                          src={`${ImagePath}${watchList.collectionImage}`}
                          alt=""
                      />
                      <div className="space-y-1 font-medium">
                        <div>{watchList.name}</div>
                      </div>
                    </div>
                  </a>
                </th>
                <td className="px-2 py-4">
                <button
                    onClick={handleButtonClick(idx)}
                    className="focus:shadow-outline mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-150 hover:bg-primary-color-6 hover:text-white">
                  X
                </button>
              </td>
              </tr>
              )
            )}




          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table

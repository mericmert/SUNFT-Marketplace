import React from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import { FaEthereum } from 'react-icons/fa'

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <button
        className="mt-3 mb-5 flex h-10 w-32 items-center justify-center gap-x-2 rounded-md bg-gradient-to-r from-indigo-500 to-primary-color-5 text-gray-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <BiPurchaseTag />
        Make offer
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col items-center rounded-lg border-0 bg-white text-center shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="border-slate-200 flex items-center justify-between rounded-t border-b border-solid p-5 text-center">
                  <h3 className="text-2xl font-semibold">Make an offer</h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                      <label
                        for="exampleNumber0"
                        class="form-label mb-2 inline-block text-gray-700"
                        Price
                      />
                      <div className="flex">
                        <input
                          type="text"
                          class="
                            form-control
                            m-0
                            block
                            w-full
                            rounded
                            border
                            border-solid
                            border-gray-300
                            bg-white bg-clip-padding
                            px-3 py-1.5 text-base
                            font-normal
                            text-gray-700
                            transition
                            ease-in-out
                            focus:border-purple-400 focus:bg-white focus:text-gray-700 focus:outline-none
      "
                          placeholder="Amount"
                        />

                        <FaEthereum className="mt-2 ml-1 text-xl text-primary-color-4" />
                        <p className="mt-2 ml-1 text-base text-black">ETH</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="border-slate-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mr-1 mb-1 rounded bg-purple-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-purple-700 hover:shadow-lg focus:outline-none active:bg-purple-800"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Make Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  )
}

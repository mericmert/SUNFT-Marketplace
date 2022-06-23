import React from 'react'
import Layout from '../components/Layout'

const createCollection = () => {
  return (
    <div>
      <Layout>
        <div className="container my-24 mx-auto px-6">
          <section className="mb-32 text-left text-gray-800">
            <div className="mx-auto max-w-[700px] px-3 lg:px-6">
              <h2 className="mb-12 text-4xl font-bold text-white">
                Create a Collection
              </h2>
              <h5 className="mb-4 text-sm text-white">
                <span className="text-red-600">*</span> Required fields
              </h5>
              <form>
                <h2 className="mb-3 text-xl font-bold text-white">
                  Logo image<span className="text-red-600">*</span>
                </h2>

                <div className="form-group">
                  <div className="mb-6">
                    <div className="flex w-full items-center pt-3">
                      <label
                        for="dropzone-file"
                        className="border-blackbg-[#363840] flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed hover:bg-gray-500 focus:border-pink-500"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="mb-3 h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-xs text-gray-200">
                            <span className="font-semibold">Click to upload</span>
                            <p>or drag and drop</p>
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-6">
                  <h2 className="mb-3 text-xl font-bold text-white">
                    Name <span className="text-red-600">*</span>
                  </h2>
                  <input
                    type="text"
                    className="form-control m-0
                          block
                          w-full
                          rounded
                          border
                          border-solid
                          border-black
                          bg-[#363840]
                          bg-clip-padding
                          px-3 py-1.5 
                          text-base
                          font-normal
                          text-gray-200
                          transition
                          ease-in-out
                          
                          focus:text-gray-700"
                    id="exampleInput7"
                    placeholder="Item name"
                  />
                </div>

                <h2 className="mb-3 text-xl font-bold text-white">
                  Description
                </h2>

                <div className="form-group mb-6">
                  <textarea
                    className="
                          form-control
                          m-0
                          block
                          w-full
                          rounded
                          border
                          border-solid
                          border-black
                          bg-[#363840]
                          bg-clip-padding
                          px-3 py-1.5 
                          text-base
                          font-normal
                          text-gray-200
                          transition
                          ease-in-out
                          
                          focus:text-gray-700
                        "
                    id="exampleFormControlTextarea13"
                    rows="3"
                    placeholder="Provide a detailed description of your item."
                  ></textarea>
                </div>

                <h2 className="mb-3 text-xl font-bold text-white">Category</h2>

                <div className="form-group mb-6">
                  <select
                    className="form-select m-0
                              block
                              w-full
                              appearance-none
                              rounded
                              border
                              border-solid
                              border-black
                              bg-[#363840]
                              bg-clip-padding 
                              bg-no-repeat
                              px-3 py-1.5 text-base
                              font-normal
                              text-gray-100
                              transition
                              ease-in-out
                              
                           focus:outline-none"
                    aria-label="select"
                  >
                    <option selected>Add category</option>
                    <option value="1">Art</option>
                    <option value="2">Photography</option>
                    <option value="3">Music</option>
                    <option value="4">Sports</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="
                      w-34
                      rounded
                      border
                      border-black
                      bg-indigo-600
                      px-6
                      py-2.5
                      text-sm
                      font-bold
                      uppercase
                      leading-tight
                      text-white
                      shadow-md
                      transition duration-150
                      ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-800
                      focus:shadow-lg focus:outline-none
                      focus:ring-0
                    
                      active:shadow-lg"
                >
                  CREATE
                </button>
              </form>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  )
}

export default createCollection

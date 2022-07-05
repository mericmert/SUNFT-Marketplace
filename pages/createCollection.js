import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import useInput from "../hooks/useInputState";
import NFTCollection from "../objects/NFTCollection";
import NFTCollectionHelper from "../backendHelpers/NFTCollectionHelper";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";


const createCollection = () => {
  const [formData, handleFormDataChange, reset] = useInput({  name: "", description: "", category: null });
  const [media, setMedia] = useState(null);
  const { name, category, description } = formData;
  const router = useRouter();
  const user = useSelector(state => state.user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCollection = new NFTCollection({name, description, owner: user.username, category, numLikes: 0, collectionImage: media});
    await NFTCollectionHelper.add(newCollection);
    await router.push("/myCollections");

  }
  const handleMediaSelect = (e) => {
    setMedia(e.target.files[0]);
  }

  useEffect(() => {
    if (user == null) {
      router.push("/login");
    }
  }, [user])


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
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleMediaSelect} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-6">
                  <h2 className="mb-3 text-xl font-bold text-white">
                    Name <span className="text-red-600">*</span>
                  </h2>
                  <input
                      name="name"
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

                        focus:text-gray-300"
                      id="exampleInput7"
                      placeholder="Item name"
                      value={name}
                      onChange={handleFormDataChange}
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
                          
                          focus:text-gray-300
                        "
                    id="exampleFormControlTextarea13"
                    rows="3"
                    placeholder="Provide a detailed description of your item."
                    name={"description"}
                    value={description}
                    onChange={handleFormDataChange}
                  />
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
                    name={"category"}
                    onChange={handleFormDataChange}
                    value={category}
                  >
                    <option selected>Add category</option>
                    <option value="Art">Art</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <button
                    onClick={handleSubmit}
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

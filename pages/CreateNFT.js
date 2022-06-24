import React, {useContext, useEffect, useReducer, useState} from 'react'
import Layout from '../components/Layout'
import useInput from "../hooks/useInputState";
import {AuthContext} from "../context/authContext";
import {useRouter} from "next/router";
import {createNewNFTContractAndMint} from "./blockchain/web3Functions";
import NFTCollectionHelper from "../backendHelpers/NFTCollectionHelper";
import NFTCollectionCategoryHelper from "../backendHelpers/NFTCollectionCategoryHelper";
import NFT from "../objects/NFT";
import NFTHelper from "../backendHelpers/NFTHelper";


const CreateNFT = () => {
  const [formData, handleFormDataChange, resetFormData] = useInput({ dataType: null, name: "", description: "", collection: "", id: null});
  const { id, dataType, name, description, collection } = formData;
  const [media, setMedia] = useState(null);
  const { state, _ } = useContext(AuthContext);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const handleMediaSelect = (e) => {
    setMedia(e.target.files[0]);
  }
  useEffect(() => {
    (async () => getNFTCollections())();
    if (typeof JSON.parse(localStorage.getItem("state")).uAddress != "string") {
      router.push("/login");
    }

  }, []);

  const getNFTCollections = async () => {
    const categories = await NFTCollectionHelper.findMany({owner: JSON.parse(localStorage.getItem("state")).user.username});
    setCategories(categories);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const nftData = await createNewNFTContractAndMint({...formData, media });
    const newNFT = new NFT({index: id, UID: nftData.address, name, description, metaDataType: dataType, creator: JSON.parse(localStorage.getItem("state")).uAddress,
    collectionName: collection, currentOwner: JSON.parse(localStorage.getItem("state")).user.uAddress, marketStatus: 0, dataLink: nftData.dataLink, numLikes: 0});
    await NFTHelper.add(newNFT);

  }

  useEffect(() => {
    console.log(categories);
  }, [categories])


  return (
    <div>
      <Layout>
        <div className="container my-24 mx-auto px-6">
          <section className="mb-32 text-left text-gray-800">
            <div className="mx-auto max-w-[700px] px-3 lg:px-6">
              <h2 className="mb-12 text-4xl font-bold text-white">
                Create New Item
              </h2>
              <h5 className="mb-4 text-sm text-white">
                <span className="text-red-600">*</span> Required fields
              </h5>
              <form>
                <h2 className="mb-3 text-xl font-bold text-white">
                  Image, Video, or Audio <span className="text-red-600">*</span>
                </h2>

                <div className="form-group">
                  <div className="mb-6">
                    <div className="flex w-full items-center justify-center">
                      <label
                        for="dropzone-file"
                        className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-[#363840] hover:bg-gray-600 border-black"
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
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>{' '}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" name={"media"} onChange={handleMediaSelect} />
                      </label>
                    </div>
                  </div>
                </div>

                <h2 className="mb-3 text-xl font-bold text-white">
                  Data type <span className="text-red-600">*</span>
                </h2>
                <h5 className="mb-3 text-xs text-white">
                  Please select the type of the data.
                </h5>

                <div className="form-group mb-6">
                  <select
                    className="form-select m-0
                            block
                            w-full
                            appearance-none
                            rounded
                            border
                            border-solid border-black
                            
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
                    name={"dataType"}
                    value={dataType}
                    onChange={handleFormDataChange}
                  >
                    <option selected>Select type</option>
                    <option value="image">Image</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                  </select>
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
                <div className="form-group mb-6">
                  <h2 className="mb-3 text-xl font-bold text-white">
                    ID <span className="text-red-600">*</span>
                  </h2>
                  <input
                      name="id"
                      type="number"
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
                      id="exampleInput8"
                      placeholder="Item ID"
                      value={id}
                      onChange={handleFormDataChange}
                  />
                </div>


                <h2 className="mb-3 text-xl font-bold text-white">
                  Description
                </h2>
                <h5 className="mb-3 text-xs text-white">
                  The description will be included on the item's detail page
                  underneath its image.
                </h5>

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

                <h2 className="mb-3 text-xl font-bold text-white">
                  Collection
                </h2>
                <h5 className="mb-3 text-xs text-white">
                  This is the collection where your item will appear.
                </h5>

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
                    name={"collection"}
                    onChange={handleFormDataChange}
                    value={collection}
                  >
                    {categories.map((category) => <option value={category.name}>{category.name}</option>)}
                  </select>
                </div>


                <h5 className="mb-3 text-xs text-white">
                  Auction to the highest bidder.
                </h5>

                <button
                  onClick={handleFormSubmit}
                  className="
                      w-34
                      border-black
                      rounded
                      border
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
export default CreateNFT;



import React, { useEffect, useContext, useState } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import {AuthContext} from '../context/authContext'
import UserHelper from "../backendHelpers/UserHelper";
import { WEB3_CONNECTION_SUCCESS, WEB3_CONNECTION_FAILED } from "../backendHelpers/types";
import { ThreeDots } from  'react-loader-spinner';
import {ethers} from "ethers";

export default function login() {

  const router = useRouter()
  const {state, dispatch} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);

  
  const connect = async () => {
    try {
      if (typeof window  !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const _address = await signer.getAddress();
        setAddress(_address);
      }

      }
      catch (ex) {
        console.log("Hata!", ex);
      }
  }

  useEffect(() => {
    UserHelper._initialize(dispatch);
  },[])

  useEffect(() => {
    if (address != null) {
      dispatch({type: WEB3_CONNECTION_SUCCESS, payload: address });
      UserHelper.find({uAddress: address}).then(user => {
        if (user == false) {
          router.push(`/register/${address}`);
        } else {
          router.push(`/loginUsername/${address}`)
        }
      })
    }
    else {
      console.log("WEB3_CONNECTION_FAILED")
      dispatch({
        type: WEB3_CONNECTION_FAILED
      })
      setTimeout(() => {
        setLoading(false);
      },100)
    }
  }, [address])

    return (
      <Layout>
         {loading ? 
          <div className='h-screen w-full flex justify-center items-center'>
            <ThreeDots
              height="100"
              width="100"
              color='grey'
              ariaLabel='loading'
            />
          </div>
          :
          <div className='w-full h-64  text-center font-main-font flex flex-col justify-center items-center p-4 pt-6 rounded-xl'>
          <h1 className=' text-white text-xl font-bold'>You need to connect your Ethereum wallet to use SUNFT</h1>
          <p className=' text-gray-400  font-main-font'>Connect with a wallet provider</p>
          <button
              className='text-gray-200 mt-4 p-6 w-48 h-10 text-center rounded-md bg-[#333232] hover:bg-[#434242] overflow-hidden flex justify-center items-center gap-x-3'
              onClick={connect}
          >
            <img src='/assets/metamask.ico' width='32px'/>
            <p>MetaMask</p>
          </button>
        </div>
         }
      </Layout>
    )

}




import React, { useContext, useState } from 'react'
import { MdMarkEmailRead } from 'react-icons/md'
import { AuthContext } from '../context/authContext'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
const Verification = () => {
  const { isWeb3Active, setLogin } = useContext(AuthContext)
  const router = useRouter()
  const handleVerification = async (e) => {
    //POST REQUEST
    // activate
    await setLogin(true)
    router.push('/')
  }

  if (isWeb3Active) {
    return (
        <Layout>
          <div>
            <div className="flex w-full flex-col items-center justify-center rounded-xl p-4 pt-36 text-center font-main-font">
              <div className="text-9xl text-white">
                <MdMarkEmailRead></MdMarkEmailRead>
              </div>
              <h1 className=" text-2xl font-bold text-white">Verify your email.</h1>
              <p className=" pt-3  font-main-font text-base text-gray-400">
                We've sent an email to your address to verify your email and
                activate your account.
              </p>
            </div>
          </div>
        </Layout>
    )
  } else {
    return <h1>Login olmadın!</h1>
  }
}

export default Verification

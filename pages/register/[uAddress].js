import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import UserHelper from "../../backendHelpers/UserHelper";
import { RESET_REGISTER_SUCCESS } from "../../backendHelpers/types";
import { ThreeDots } from  'react-loader-spinner'

const register = ({ uAddress }) => {

  const { state, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [re_password, setRepassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await UserHelper.register({
      username: username,
      password: password,
      re_password: re_password,
      email: email,
      uAddress: uAddress,
    });

  }
 

  useEffect(() => {
    UserHelper._initialize(dispatch);
    if (state.register_success) {
      console.log("Succesfully registered!");
      router.push("/");
      setLoading(false);
    }
    else{
      setLoading(false);
    }
  }, [state])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleRePasswordChange = (e) => {
    setRepassword(e.target.value)
  }

    return (
      <>
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
      <div>
        <div className="h-screen w-full">
          <div className="h-96"></div>
          <div className="mx-auto mb-12 max-w-5xl px-6 sm:px-6 lg:px-8">
            <div className=" -m-80 mx-2 rounded bg-gray-900 p-8 shadow-xl shadow-black sm:p-12 md:mx-28 lg:mx-36">
              <p className="pb-10 pt-5 text-center text-3xl font-bold leading-7 text-white">
                Welcome!
              </p>
              <form action="pages/register/[uAddress].js" method="post" onSubmit={handleSubmit}>
                <label className="flex w-full items-center justify-center pt-3 font-semibold leading-none text-gray-300">
                  Profile Picture
                </label>

                <div className="flex w-full items-center justify-center pt-5">
                  <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-700 hover:bg-gray-500"
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
                          strokeWidth="2"
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

                <div className="mt-8 items-center md:flex">
                  <div className="flex w-full flex-col">
                    <label className="flex w-full items-center justify-center font-semibold leading-none text-gray-300">
                      Username
                    </label>
                    <input
                      type="text"
                      className="mt-4 rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700 focus:outline-none"
                      onChange={handleUsernameChange}
                    />
                  </div>
                </div>
                <div className="mt-8 items-center md:flex">
                  <div className="flex w-full flex-col">
                    <label className="flex w-full items-center justify-center font-semibold leading-none text-gray-300">
                      Email
                    </label>
                    <input
                      type="text"
                      className="mt-4 rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700 focus:outline-none"
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                <div className="mt-8 items-center md:flex">
                  <div className="flex w-full flex-col">
                    <label className="flex w-full items-center justify-center font-semibold leading-none text-gray-300">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-4 rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700 focus:outline-none"
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div className="mt-8 items-center md:flex">
                  <div className="flex w-full flex-col">
                    <label className="flex w-full items-center justify-center font-semibold leading-none text-gray-300">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-4 rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700 focus:outline-none"
                      onChange={handleRePasswordChange}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button className="mt-9 rounded bg-indigo-700 py-4 px-10 font-semibold leading-none text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    }
      </>
    )
}


register.getInitialProps = async ({ query }) => {
  return { uAddress: query.uAddress };
}

export default register

import React, { useContext, useState, useEffect  } from 'react'
import { AuthContext } from "../../context/authContext";
import UserHelper from "../../backendHelpers/UserHelper";
import { useRouter} from "next/router";
import { ThreeDots } from  'react-loader-spinner'


const loginUsername = ({ uAddress }) => {

    const { state, dispatch } = useContext(AuthContext);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UserHelper.login(username, password);
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("web3-token"));
        if(data){
            router.push("/");
        }
        else{
            setLoading(false);
        }
    },[])

    useEffect(() => {
        UserHelper._initialize(dispatch);
        if (state.user) {
            router.push(`/profile/${uAddress}`);
        }
        else {
            setError("Try again.")
        }
    }, [state])

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
                                    Login to your account.
                                </p>
                                <form onSubmit={handleSubmit} method="post">
                                    <div className="mt-8 items-center md:flex">
                                        <div className="flex w-full flex-col">
                                            <label className="flex w-full items-center justify-center font-semibold leading-none text-gray-300">
                                                Username
                                            </label>
                                            <input
                                                type="username"
                                                className="mt-4 rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700 focus:outline-none"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex w-full items-center justify-center">
                                        <button
                                            type={"submit"}
                                            className="mt-9 rounded bg-indigo-700 py-4 px-10 font-semibold leading-none text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

loginUsername.getInitialProps = async ({ query }) => {
    return { uAddress: query.uAddress };
}

export default loginUsername;
import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import UserHelper from "../../../backendHelpers/UserHelper";
import {useDispatch, useSelector} from "react-redux";

const Verification = ({ uid, token }) => {
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(undefined);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const uAddress = useSelector(state => state.uAddress);

    useEffect(() => {
        UserHelper._initialize(dispatch);
    }, [])

    const handleVerification = async (e) => {
        e.preventDefault();
            await UserHelper.login(username, password);
            if (user != null && user.uAddress === uAddress) {
                const userVerified = await Users.activateUser(uid, token);
                if (userVerified) {
                    await router.push("/");
                }
                else {
                    setError("verification is not successful")
                }
            }
    }




        return (
            <div>
                <div className="flex h-64  w-full flex-col items-center justify-center rounded-xl p-4 pt-60 text-center font-main-font">
                    <h1 className=" text-3xl font-bold text-white">Welcome to SU NFT!</h1>
                    <p className=" pt-8  font-main-font text-gray-400 text-lg">
                        To finish signing up, please enter your username and password to verify your
                        email.
                    </p>

                    <div className="form-group mb-6 pt-4">
                        <h2 className="mb-3 text-base font-bold text-white">
                            Username:
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
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-6">
                        <h2 className="mb-3 text-base font-bold text-white">
                            Password:
                        </h2>
                        <input
                            type="password"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button onClick={handleVerification} className="mt-4 flex h-10 w-48 items-center justify-center gap-x-3 overflow-hidden rounded-md bg-[#333232] p-6 text-center text-gray-200 hover:bg-[#434242]">
                        <p>VERIFY</p>
                    </button>
                </div>
            </div>
        )
}

Verification.getInitialProps = ({ query }) => {
    return { uid: query.uid, token: query.token };
}

export default Verification;
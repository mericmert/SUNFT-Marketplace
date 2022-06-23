import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ProfileCard from '../../components/ProfileCard'
import ProfileInfo from '../../components/ProfileInfo'
import { IoIosArrowDown } from 'react-icons/io'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import UserHelper from "../../backendHelpers/UserHelper";




function Profile({ username, user, nfts }) {

    const [filter, setFilter] = useState({
        s: '',
        sort: '',
    })
    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState(nfts)
    const [token, setToken] = useState("s")
    const router = useRouter();


    useEffect(() => {
        if(!user){
            router.push("/");
        }
        else{
            let content = products.filter(
                (product) =>
                    product.name.toLowerCase().indexOf(filter.s.toLowerCase()) >= 0
            )
            if (filter.sort === 'asc' || filter.sort === 'desc') {
                content.sort((a, b) => {
                    const diff = a.price - b.price
                    if (diff === 0) return 0
                    const sign = Math.abs(diff) / diff
                    return filter.sort === 'asc' ? sign : -sign
                })
            }
            if (filter.sort === 'fav') {
                content.sort((a, b) => {
                    const diff = a.numLikes - b.numLikes
                    if (diff === 0) return 0
                    const sign = Math.abs(diff) / diff
                    return -sign
                })
            }
            setFilteredProducts(content)
        }
    }, [filter])

    const handleSearch = (st) => {
        setFilter({ ...filter, s: st })
    }
    const handleChange = (val) => {
        setFilter({ ...filter, sort: val })
    }
    if (!token) {
        router.push("/login")
    }
    return (
        <>
            <Layout>
                <ProfileInfo user={user} />
                <div className="flex flex-col items-center justify-between px-6 font-main-font sm:flex-row">
                    <input
                        className="my-2 w-80 appearance-none border-0 bg-[#363840] p-2 px-2 text-[#e6e8eb] outline-0 ring-0 placeholder:text-[#8a939b] sm:rounded-md"
                        type="search"
                        placeholder="Search items"
                        onKeyUp={(e) => handleSearch(e.target.value)}
                    />
                    <div className="relative">
                        <IoIosArrowDown className="absolute right-3 top-1/3 text-gray-300" />
                        <select
                            onChange={(e) => handleChange(e.target.value)}
                            className="h-11 w-80  appearance-none border-black bg-[#363840]  pl-2 text-gray-300 outline-none sm:w-48"
                        >
                            <option
                                value=""
                                className="bg-[#363840] text-gray-300  hover:text-[#1f2025]"
                            >
                                Sort by
                            </option>
                            <option
                                className="bg-[#363840] text-gray-300  hover:text-[#1f2025]"
                                value="desc"
                            >
                                Price: High to Low
                            </option>
                            <option
                                className="bg-[#363840] text-gray-300  hover:bg-[#1f2025] "
                                value="asc"
                            >
                                Price: Low to High
                            </option>
                            <option
                                className="bg-[#363840] text-gray-300  hover:bg-[#1f2025] "
                                value="fav"
                            >
                                Most Favorited
                            </option>
                        </select>
                    </div>
                </div>
                <div className="4xl:flex flex h-full flex-col items-center gap-6 border-black bg-[#231e28] p-6 shadow-sm sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((nft,indx) => (
                        <ProfileCard
                            key={nft.id}
                            username={username}
                            title={nft.name}
                            like={nft.numLikes}
                            eth_price={nft.price}
                            image={nft.dataLink}
                            desc={nft.description}
                            uid = {nft.UID}
                            idx = {nft.index}
                        />
                    ))}
                </div>
            </Layout>
        </>
    )
}

Profile.getInitialProps = async ({ query }) => {
    const { uAddress } = query;
    const user = await UserHelper.find({ uAddress });
    let nfts = null;
    if(user){
        nfts = await user.getNFTsOwned();
        nfts = nfts.map((nft,indx) => ({...nft,price:(indx * 8 + 13)}));
    }
    else{
        
    }
    return { uAddress, user, nfts };
}

export default Profile;
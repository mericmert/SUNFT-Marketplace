import { ContractFactory,ethers } from "ethers";

import erc20Abi from "./ABI/erc20abi.json";
import marketAbi from "./ABI/marketabi.json";
import nftAbi from "./ABI/erc721abi.json";
import nftBytecode from "./bytecodes/nftBytecode";



const marketAddress = "0x85EE8C2B66D2659A94d820b63c8E8e376B4Fc7a3";
const sucoinAddress = "0x748b33652d3dF39be54a1c3C378b7d9178D20543";
const NFTaddress = "";
if (typeof window === "undefined") {
     /* we're on the server */ }
else{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    var signer = provider.getSigner();
    const marketContract = new ethers.Contract(marketAddress,marketAbi,signer);
    const sucoinContract = new ethers.Contract(sucoinAddress,erc20Abi,signer);


//get metamask user
    

}



//get user balance deposited to the market ONLY WORKS FOR CURRENT USER
export async function getSuCoinBalanceOnMarket(){
    const balanceOnMarket = await marketContract.getMarketBalance();
    return balanceOnMarket;
}


//get user balance that is not on the marketplace REQUIRES USER ADDRESS
export async function getSuCoinBalanceNotOnMarket(address){
    const balance = await sucoinContract.balanceOf(address);
    return balance;
}
//gets current bid for auction REQUIRES nft_address AND tokenId PARAM
export async function getAuctionInfoCurrBid(address,tokenId ){
    const lastBid = await sucoinContract.getAuctionInfoPrice(address,tokenId);
    return lastBid;
}

//mints nft from an already deployed smart contract
//requires address of NFT contract, and a new ID for the nft.
//also needs metadata for the NFT.
//metadata format:'{"name": "' + name_final +  '","description": "' + desc_final+ '","collection": "' +collection_final+ '","URL":"'+ url_final + '"}'
export async function mintNftFromExistingContract(address,tokenId,metadata){
    const nftContract = new ethers.Contract(address,nftAbi,signer);
    console.log(await signer.getAddress());
    await nftContract.safeMint(await signer.getAddress(),tokenId,metadata,{gasLimit: 300000});
    
}


//deposit SUcoin to market.
export async function depositSucoin(amount){
    await sucoinContract.approve(marketAddress,amount);
    await marketContract.depositBalance(amount);
}
//withdraw SUcoin from market
export async function withdrawSucoin(amount){
    await marketContract.withdrawBalance(amount);
}
//deposit NFT to market ADDRESS is NFT ADDRESS
export async function deposit(address,tokenId){
    const nftContract = new ethers.Contract(address,nftAbi,signer);
    nftContract.approve(marketAddress,tokenId);
    marketContract.deposit(address,tokenId);

}
//withdraw NFT from market ADDRESS is NFT ADDRESS
export async function withdraw(address, tokenId){
    marketContract.withdraw(address,tokenId);

}
//start an auction
export async function startAuction(address,tokenId,startPrice){
    marketContract.startAuction(address,tokenId,startingPrice);
}

//Bids on an ongoing auction
export async function bid(address,tokenId,price){
    marketContract.bid(address,tokenId,price);
}

//Ends auction (1 day needs to be passed before this can be called.)

export async function endAuction(address,tokenId){
    marketContract.endAuction(address,tokenId);
}

//creates a new NFT smart contract and 
//mints the NFT with the token ID of tokenId parameter.
//metadata format : '{"name": "' + name_final +  '","description": "' + desc_final+ '","collection": "' +collection_final+ '","URL":"'+ url_final + '"}'



export async function createNewNFTContractAndMint(metadata){

    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('file', metadata.media);
    data.append('pinataOptions', '{"cidVersion": 1}');
    data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}');

    var config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYTA0NzYyYS0yOTQ3LTQ0ZjctOWI3MS01MGI5NjM0YTYyZDkiLCJlbWFpbCI6ImVyZW5ha3lpbGRpekBzYWJhbmNpdW5pdi5lZHUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmM3Y2RmYTYyMTRiMjVjNjkzNjciLCJzY29wZWRLZXlTZWNyZXQiOiJiZTc2NTExODdiOWJjY2RkMjE1MGYyMzg5NTU3OGU4ZjQzMmJkNmNhZmYxMTZiOWQxYTY1NmUyM2VjYjZiOTA3IiwiaWF0IjoxNjU2MDI3NTgwfQ.yVabtfwveOYxCiJdDhsPNi7CmZnnbfO_QSAWMRRxIP8',
            // ...data.getHeaders()
        },
        data : data
    };

    const res = await axios(config);

    console.log(res.data);


    const bodyObject = '{"name": "' + metadata.name +  '","description": "' + metadata.description + '","collection": "' +metadata.collection + '","URL":"'+ "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash + '"}'
    const hash = await postData(bodyObject);
    var IPFSURL = "https://gateway.pinata.cloud/ipfs/" + hash;
    const factory = new ContractFactory(nftAbi, nftBytecode,signer);
    const contract = await factory.deploy();
    const nftContract = new ethers.Contract(contract.address,nftAbi,signer);
     await nftContract.safeMint(await signer.getAddress(),metadata.id,IPFSURL,{gasLimit: 300000});
     const urlData = await axios.get(IPFSURL);
     const URL = urlData.data.URL;
     console.log(urlData.data)
    return {address: nftContract.address, dataLink: URL };
}


async function postData (bodyObject) {

    var stringResponseBody;
    console.log(bodyObject);
    const response = await fetch(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, {
  
      method: "POST",
      body: bodyObject,
      headers: {
        "Content-Type": "application/json",
        "pinata_api_key": "3cde114288ed16705b7f",
        "pinata_secret_api_key": "bda13f869da033f188d719c2ea27624fc88ea813a67bb780e42c6fce4b357603"    
    }}).then(response => response.text()).then((body) => {
      console.log(body);
      stringResponseBody = body;
    }
       
  
        );
  
      console.log(JSON.parse(stringResponseBody)["IpfsHash"])
      return(JSON.parse(stringResponseBody)["IpfsHash"]);
   
  }
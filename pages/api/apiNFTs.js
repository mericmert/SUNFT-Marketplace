const APIURL = "localhost:8000/api/nfts";

const listNFTs = async (data) => {
    const response = await fetch(APIURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const res = await response.json();
        return res;
    }
    return response.status;
}

const createNFT = async (data) => {
    const response = await fetch(APIURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.ok;
}

const deleteNFT = async (data) => {
    const response = await fetch(APIURL, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.ok;
}

export default { listNFTs, createNFT, deleteNFT };
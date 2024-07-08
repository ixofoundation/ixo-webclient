export const fileStorage = {
  ipfs: {
    endpoint: "https://{cid}.ipfs.w3s.link/",
    name: "W3S",
    generateEndpoint: (cid: string) => `https://${cid}.ipfs.w3s.link/`,
  },
  cellnode: {
    endpoint: `${process.env.REACT_APP_PDS_URL}`,
    name: "Cellnode",
    generateEndpoint: (cid: string) => `${process.env.REACT_APP_PDS_URL}public/${cid}`,
  }
};

const getIPFSDotIOProof = (endpoint: string) => {
  const cidRegex = /\/ipfs\/([a-zA-Z0-9]+)/;

  const match = endpoint.match(cidRegex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};

function getCidFromCfIPFS(url: string) {
  // Create a URL object to easily manipulate the URL
  const urlObj = new URL(url);
  
  // Split the pathname to get the CID
  const pathnameParts = urlObj.pathname.split('/');
  
  // The CID is the last part of the pathname
  const cid = pathnameParts[pathnameParts.length - 1];
  
  return cid;
}

export const transformStorageEndpoint = (endpoint?: string) => {
  if (endpoint?.includes("ipfs")) {
    if (endpoint.includes("https://ipfs.io/ipfs/")) {
      const cid = getIPFSDotIOProof(endpoint);
      if (cid) {
        return fileStorage.ipfs.generateEndpoint(cid);
      }
    }
    if(endpoint.includes("https://cf-ipfs.com")){
      const cid = getCidFromCfIPFS(endpoint);
      if (cid) {
        return fileStorage.ipfs.generateEndpoint(cid);
      }
    }
    if(endpoint.includes("ipfs:")){
      return fileStorage.ipfs.generateEndpoint(endpoint.replace("ipfs:", ""));
    }
  }

  if(endpoint?.includes("cellnode")) {
    if(endpoint.includes("cellnode:")){
      if(endpoint.includes("cellnode:/public/")){
        return endpoint.replace("cellnode:/public/", fileStorage.cellnode.endpoint);
      }
      return endpoint.replace("cellnode:/", fileStorage.cellnode.endpoint);
    }
  }

  return endpoint;
};

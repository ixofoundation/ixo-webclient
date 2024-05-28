export const fileStorage = {
    ipfs: {
        endpoint: "https://{cid}.ipfs.w3s.link/",
        name: "W3S",
        generateEndpoint: (cid: string) => `https://${cid}.ipfs.w3s.link/`,
    }
}
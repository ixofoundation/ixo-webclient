type URIMappings = {
  [key: string]: string;
};

const uriMappingsCDN: URIMappings = {
  "https://ipfs.io/": "https://cf-ipfs.com/",
};

export const getMappedCDNURL = (src: string): string => {
  const mappingNeeded = Object.keys(uriMappingsCDN).find(
    (key) => src?.includes(key),
  );
  
  if(!mappingNeeded){
    return src
  }

  const newOrigin = uriMappingsCDN[mappingNeeded]

  return `${newOrigin}${src.replace(mappingNeeded, "")}`;
};

const uriMappingsNewURL: URIMappings = {
  "https://testnet-cellnode.ixo.earth/": "https://cellnode-pandora.ixo.world/",
};

export const getMappedNewURL = (src: string) => {
  const mappingNeeded = Object.keys(uriMappingsNewURL).find(
    (key) => src?.includes(key),
  );
  
  if(!mappingNeeded){
    return src
  }

  const newOrigin = uriMappingsNewURL[mappingNeeded]

  return `${newOrigin}${src.replace(mappingNeeded, "")}`;
}

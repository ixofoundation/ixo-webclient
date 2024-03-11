type URIMappings = {
  [key: string]: string;
};

const uriMappings: URIMappings = {
  "https://ipfs.io/": "https://cf-ipfs.com/",
};

export const getCDNURL = (src: string): string => {
  const mappingNeeded = Object.keys(uriMappings).find(
    (key) => src?.includes(key),
  );
  
  if(!mappingNeeded){
    return src
  }

  const newOrigin = uriMappings[mappingNeeded]

  return `${newOrigin}${src.replace(mappingNeeded, "")}`;
};

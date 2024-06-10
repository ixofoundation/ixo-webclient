import { getMappedNewURL } from "@ixo-webclient/utils";
import { serviceEndpointToUrl } from "utils/entities";


export const getSurveyJsResource = async ({ resource, service }: { resource: any; service: any; }) => {
  if (!resource) return;
  const url = serviceEndpointToUrl(resource.serviceEndpoint, service);

  console.log({resource, url})

  const newUrl = getMappedNewURL(url)
  console.log({newUrl})

  return fetch(newUrl)
    .then((response) => {
      console.log({response})
      return response.json()
    })
    .then((response) => {
      console.log({response})
      return response.question
    });
};

import { getMappedNewURL } from "@ixo-webclient/utils";
import { serviceEndpointToUrl } from "utils/entities";


export const getSurveyJsResource = async ({ resource, service }: { resource: any; service: any; }) => {
  if (!resource) return;
  const url = serviceEndpointToUrl(resource.serviceEndpoint, service);

  const newUrl = getMappedNewURL(url)

  return fetch(newUrl)
    .then((response) => response.json())
    .then((response) => response.question);
};

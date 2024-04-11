import { getMappedNewURL } from "@ixo-webclient/utils";
import { serviceEndpointToUrl } from "utils/entities";


export const getSurveyJsResource = async ({ resource, service }: { resource: any; service: any; }) => {
  if (!resource) return;
  const url = serviceEndpointToUrl(resource.serviceEndpoint, service);

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => response.question);
};

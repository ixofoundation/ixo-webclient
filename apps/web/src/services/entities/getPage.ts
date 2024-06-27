import { getMappedNewURL } from "@ixo-webclient/utils";
import { replacePDSWithCellNode, serviceEndpointToUrl } from "utils/entities";


export const getPage = async ({ setting, service }: { setting: any; service: any; }) => {
  if (!setting) return;
  const url = serviceEndpointToUrl(setting.serviceEndpoint, service);

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => {
      if ('@context' in response && 'page' in response) {
        return { 'page':  response.page };
      }

      return { 'pageLegacy': replacePDSWithCellNode(response) };
    }
    );
};

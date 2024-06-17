import { customQueries, utils } from "@ixo/impactxclient-sdk";
import { chainNetwork } from "hooks/configs";
import { convertFileToBase64 } from "utils/images";

// Define the type of the returned object from uploadWeb3Doc method
interface UploadWeb3DocResponse {
  url: string;
}

export async function uploadFile(file: File): Promise<string> {
  const base64EncodedImage = await convertFileToBase64(file);

  const mimeTypeMatch = base64EncodedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (!mimeTypeMatch) {
    throw new Error("Failed to extract MIME type from the base64 encoded image.");
  }
  const mimeType = mimeTypeMatch[1];

  const image: UploadWeb3DocResponse = await customQueries.cellnode.uploadWeb3Doc(
    utils.common.generateId(12),
    `application/${mimeType}`,
    base64EncodedImage.split(',')[1],
    undefined,
    chainNetwork,
  );

  return image.url;
}

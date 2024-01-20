export const server = 'https://rumexstore-api.azurewebsites.net';
export const azureBlobStorage =
  'https://rumexstoreloggingstorage.blob.core.windows.net';
export const azureFunctions = 'https://apim-rumexstore.azure-api.net';
export const environment = {
  production: true,
  webAPIUrl: `${server}/api`,
  blobUrl: `${azureBlobStorage}`,
  funcUrl: `${azureFunctions}/rmx-func-imageprocessing`,
  funcSubscriptionKey: '70d79ad58460447387845391109fd132',
};

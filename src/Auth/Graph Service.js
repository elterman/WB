import { Client } from '@microsoft/microsoft-graph-client';

// var graph = require('@microsoft/microsoft-graph-client');

const getAuthenticatedClient = (accessToken) => {
  // initialize Graph client
  const client = Client.init({
    // use the provided access token to authenticate requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
};

export const getUserDetails = async (accessToken) => {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api('/me').get();
  return user;
};

export const getUserPhoto = async (accessToken) => {
  const client = getAuthenticatedClient(accessToken);

  const photo = await client.api('/me/photo/$value').get();
  return photo;
};

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getExchanges: builder.query({
      query: (count) => createRequest(`/exchanges`)
    }),
    getCryptoDetails: builder.query({
      query: (uuid) => createRequest(`/coin/${uuid}`)
    }),
    getCryptoHistory: builder.query({
      query: ({ uuid, timePeriod }) => createRequest(`/coin/${uuid}/history/?timePeriod=${timePeriod}`)
    })
  })
});

export const { useGetCryptosQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;

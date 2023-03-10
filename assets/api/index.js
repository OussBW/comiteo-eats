import axios from 'axios';

const endpoints = {
    comiteo: 'https://comiteo-eats.victormx.com',
    mockapi: 'https://640a45e065d3a01f98fbbee2.mockapi.io/api',
};
// eslint-disable-next-line no-undef
const baseURL = endpoints[GLOBAL_CONFIG.apiEndpoint];

export default axios.create({
    baseURL,
    timeout: 1000,
});

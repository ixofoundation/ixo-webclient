import Axios from 'axios';
import axiosRetry from 'axios-retry';

console.log('axios', axiosRetry);

axiosRetry(Axios, {retries: 3});

export default Axios;

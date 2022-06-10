import Axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(Axios, {retries: 3});

export default Axios;

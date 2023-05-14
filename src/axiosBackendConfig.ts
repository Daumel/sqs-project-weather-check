import axios from 'axios';
import logger from '@/src/logger';

const axiosBackendConfig = axios.create();

axiosBackendConfig.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (axios.isAxiosError(error)) {
            logger.error(`Axios Error: ${error}`);
            if (error.response) {
                logger.error(`Error Status: ${error.response.status}`);
                logger.error(`Error Data: ${error.response.data}`);
            }
        } else {
            logger.error(`General Error: ${error}`);
        }
        return Promise.reject(error);
    }
);

export default axiosBackendConfig;

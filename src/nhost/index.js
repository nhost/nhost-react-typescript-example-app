import nhost from 'nhost-js-sdk';
import { BACKEND_ENDPOINT } from '../config';

const config = {
  endpoint: BACKEND_ENDPOINT,
  storage_type: 'localStorage',
};

export default new nhost(config);

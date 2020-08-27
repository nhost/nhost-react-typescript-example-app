import nhost from "nhost-js-sdk";
import * as config from "../config";

const nhostConfig = {
  base_url: config.BACKEND_ENDPOINT,
};

nhost.initializeApp(nhostConfig);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };

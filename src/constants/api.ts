import wretch from 'wretch';
// @ts-expect-error
import QueryStringAddon from 'wretch/dist/addons/queryString';
// @ts-expect-error
import AbortAddon from 'wretch/dist/addons/abort';

const FALL_SURVEILANCE = wretch(
  process.env.FALL_SERVERILANCE_URL ?? 'http://14.225.204.127',
)
  .addon(QueryStringAddon)
  .addon(AbortAddon())
  .errorType('json');

export const API = {
  FALL_SURVEILANCE,
};

export const loginApi = (token: string) => {
  API.FALL_SURVEILANCE = FALL_SURVEILANCE.auth(`Bearer ${token}`);
};

export const logoutApi = () => {
  API.FALL_SURVEILANCE = FALL_SURVEILANCE;
};

export const API_PATH = {
  IDENTITY_SERVICES: {
    ME: '/api/identity-services/me/',
    LOGIN: '/api/identity-services/token/',
  },
  USER_SERVICES: {
    PROFILE: (id: string) => '/api/user-services/profile/' + id + '/',
  },
  HOUSE_SERVICES: {
    CREATE: '/api/house-services/houses/',
    JOINED_HOUSES: '/api/house-services/houses/joined/',
    HOUSE_DETAIL: (id: string) => '/api/house-services/houses/' + id + '/',
  },
};

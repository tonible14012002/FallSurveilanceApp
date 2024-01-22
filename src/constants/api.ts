import wretch from 'wretch';
// import QueryStringAddon from 'wretch/addons/queryString';
// import AbortAddon from 'wretch/addons/abort';

const FALL_SURVEILANCE = wretch(
  process.env.FALL_SERVERILANCE_URL ?? 'http://localhost:8080/',
)
  // .addon(QueryStringAddon)
  // .addon(AbortAddon())
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
};

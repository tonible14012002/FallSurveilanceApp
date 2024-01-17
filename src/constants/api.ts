import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import AbortAddon from 'wretch/addons/abort';

const FALL_SURVEILANCE = wretch('')
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
  LOGIN: '/api/token/',
  PROFILE: '',
};

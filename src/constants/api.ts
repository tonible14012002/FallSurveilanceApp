import wretch from 'wretch';
// @ts-expect-error
import QueryStringAddon from 'wretch/dist/addons/queryString';
import queryString from 'wretch/addons/queryString';
// @ts-expect-error
import AbortAddon from 'wretch/dist/addons/abort';

const FALL_SURVEILANCE = wretch(
  process.env.FALL_SERVERILANCE_URL ?? 'http://14.225.204.127/api',
)
  .addon(QueryStringAddon as typeof queryString) // Temporary fix for wretch type
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
    ME: '/identity-services/me/',
    LOGIN: '/identity-services/token/',
  },
  USER_SERVICES: {
    PROFILE: (id: string) => '/user-services/profile/' + id + '/',
    SEARCH_USERS: '/user-services/profile/search/',
  },
  HOUSE_SERVICES: {
    CREATE: '/house-services/houses/',
    JOINED_HOUSES: '/house-services/houses/joined/',
    HOUSE_DETAIL: (id: string) => '/house-services/houses/' + id + '/',
    ASSIGNABLE_USERS: (houseId: string) =>
      '/house-services/houses/' + houseId + '/add-members/search/',
    CREATE_ROOM: (id: string) => '/house-services/houses/' + id + '/rooms/',
    HOUSE_ROOMS: (id: string) => '/house-services/houses/' + id + '/rooms/',
    ROOM_DETAIL: (id: string) =>
      '/house-services/houses/room-detail/' + id + '/',
    SEARCH_ASSIGNABLE_USERS: (id: string) =>
      '/house-services/houses/rooms/' + id + '/add-members/search/',
  },
};

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
    HOUSE_MEMBERS: (houseId: string) =>
      '/house-services/houses/' + houseId + '/add-members/',
    ASSIGNABLE_USERS: (houseId: string) =>
      '/house-services/houses/' + houseId + '/add-members/search/',
    CREATE_ROOM: (id: string) => '/house-services/houses/' + id + '/rooms/',
    HOUSE_ROOMS: (id: string) => '/house-services/houses/' + id + '/rooms/',
    ROOM_DETAIL: (id: string) =>
      '/house-services/houses/room-detail/' + id + '/',
    ASSIGNABLE_ROOM_USERS: (id: string) =>
      '/house-services/houses/rooms/' + id + '/add-members/search/',
    ROOM_MEMBERS: (roomId: string) =>
      '/house-services/houses/rooms/' + roomId + '/members/',
    UPDATE_ROOM_PERMISSIONS: ({
      room_id,
      member_id,
    }: {
      room_id: string;
      member_id: string;
    }) =>
      '/house-services/houses/rooms/' +
      room_id +
      '/members/' +
      member_id +
      '/permissions/',
    ADD_ROOM_MEMBERS: (roomId: string) =>
      '/house-services/houses/rooms/' + roomId + '/add-members/',
  },
  DEVICE_SERVICES: {
    SPECIFICATIONS: '/device-services/specifications/',
    ADD_DEVICE: (roomId: string) => `/device-services/room/${roomId}/devices/`,
    DEVICE_DETAIL: (id: string) => `/device-services/devices/` + id + '/',
    MODIFY_DEVICE: ({roomId, id}: Record<string, string>) =>
      `/device-services/room/${roomId}/devices/${id}/`,
  },
};

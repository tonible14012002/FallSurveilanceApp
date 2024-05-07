import {PaginationParams} from '../common';

export interface SearchUserProfileParams extends PaginationParams {
  search?: string;
}

export interface SearchAssignableUsersParams extends PaginationParams {
  search?: string;
}

export interface GetHouseNotificationParams extends PaginationParams {
  houseId: string;
  allowFetch?: boolean;
}

export interface GetRoomNotificationParams extends PaginationParams {
  roomId: string;
  allowFetch?: boolean;
}

export interface GetDeviceNotificationParams extends PaginationParams {
  deviceId: string;
  allowFetch?: boolean;
}

export interface GetPrivateNotificationParams extends PaginationParams {
  allowFetch?: boolean;
}

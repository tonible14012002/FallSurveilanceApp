import {HousePermission, RoomPermission} from '~/constants/permissions';
import {BasicUser} from './identity';

export interface Room {
  id: string;
  name: string;
  description: string;
  house: {
    id: string;
    name: string;
  };
  members: BasicUser[];
  allow_assign_member: boolean;
}

export interface House {
  id: string;
  name: string;
  description: string;
  address: string;
}

export interface HouseDetailRoom
  extends Pick<Room, 'id' | 'name' | 'description'> {
  accessible: boolean;
}

export interface GetHouseDetailResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  members: BasicUser[];
  rooms: HouseDetailRoom[];
}

export type GetJoinedHousesResponse = Array<
  GetHouseDetailResponse & {is_owner: boolean}
>;

export interface CreateRoomResponse extends Room {}

export interface GetRoomDetailResponse extends Room {}

export type GetHouseRoomsResponse = Array<Room>;

export type RoomMemberWithPermissions = BasicUser & {
  room_permissions: RoomPermission[];
};

export type HouseMemberWithPermissions = BasicUser & {
  house_permissions: HousePermission[];
};

export interface GetRoomMembersWithPermissionsResponse
  extends Array<RoomMemberWithPermissions> {}

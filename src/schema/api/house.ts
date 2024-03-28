import {HousePermission, RoomPermission} from '~/constants/permissions';
import {BasicUser} from './identity';

export interface Room {
  id: string;
  name: string;
  description: string;
  house: House;
  devices: Device[];
  members: BasicUser[];
  allow_assign_member: boolean;
  room_permissions: RoomPermission[];
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
  room_permissions: RoomPermission[];
}

export interface DeviceSpecification {
  id: number;
  name: string;
  series_name: string;
  gpu: string;
  gpu_max_fre: string;
  cpu: string;
  cpu_max_fre: string;
  vision_acceleration: string;
  storage: string;
  memory: string;
  power: string;
  image: string;
}

export interface Device {
  id: string;
  name: string;
  room: string;
  specification: DeviceSpecification;
  device_type: string;
  serial_number: string;
  created_at: string;
  updated_at: string;
  status: string;
  allow_access: boolean;
}

export interface DeviceDetail {
  id: string;
  name: string;
  room: string;
  specification: DeviceSpecification;
  device_type: string;
  serial_number: string;
  created_at: string;
  updated_at: string;
  status: string;
  related_users: BasicUser[];
}

export interface GetHouseDetailResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  members: BasicUser[];
  devices: Device[];
  rooms: HouseDetailRoom[];
  is_owner: boolean;
  house_permissions: HousePermission[];
}

export interface GetHouseNotificationResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  members: BasicUser[];
  devices: Device[];
  rooms: HouseDetailRoom[];
  is_owner: boolean;
  house_permissions: HousePermission[];
}

export type GetJoinedHousesResponse = Array<GetHouseDetailResponse>;

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

export interface AddDeviceResponse extends Device {}

export interface GetDeviceDetailResponse extends DeviceDetail {}

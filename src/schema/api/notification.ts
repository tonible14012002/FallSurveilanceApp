import {House, Room} from './house';
import {BasicUser} from './identity';

export interface Notification<Meta> {
  id: string;
  user: null | string;
  house: null | string;
  room: null | string;
  label: string;
  description: string;
  event_code: string;
  is_seen: boolean;
  meta: Meta;
}

export type AddMemberToHouseNotificationMeta = {
  member: BasicUser[];
  invitor: BasicUser;
  description: string;
};

export type UpdateHouseMetadataNotificationMeta = {
  house: House;
  updator: BasicUser;
  old_values: string[];
  update_fields: string[];
};

export type HouseNotificationMeta =
  | AddMemberToHouseNotificationMeta
  | UpdateHouseMetadataNotificationMeta;

export type InviteMemberToRoomNotificationMeta = {
  new_members: BasicUser[];
  invitor: BasicUser;
  description: string;
};

export type UpdateRoomMetadataNotificationMeta = {
  room: Room;
  updator: BasicUser;
  old_values: string[];
  update_fields: string[];
};

export type RoomNotificationMeta =
  | InviteMemberToRoomNotificationMeta
  | UpdateRoomMetadataNotificationMeta;

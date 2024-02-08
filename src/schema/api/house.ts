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

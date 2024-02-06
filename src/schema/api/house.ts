export interface Room {
  id: string;
  name: string;
  description: string;
}
interface User {
  id: string;
  avatar: string;
  nickname: string;
  first_name: string;
  last_name: string;
}

export interface HouseInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  members: User[];
  rooms: Room[];
  is_owner: boolean;
}

export interface GetHouseDetailResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  is_owner: boolean;
  rooms: Room[];
  members: User[];
}

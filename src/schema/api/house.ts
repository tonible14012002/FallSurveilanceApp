export interface Room {
  id: string;
  name: string;
  description: string;
}
interface Owner {
  id: string;
  avatar: string;
  nickname: string;
  first_name: string;
  last_name: string;
}

export interface GetHouseDetailResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  owners: Owner[];
  rooms: Room[];
}

export interface User {
  id: string;
  avatar: string;
  gender: string;
  city: string;
  country: string;
  nickname: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  phone: string;
}

export interface BasicUser
  extends Pick<
    User,
    'id' | 'avatar' | 'nickname' | 'first_name' | 'last_name'
  > {}

export interface LoginResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface UpdateProfileResponse extends User {}

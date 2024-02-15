import {PaginationParams} from '../common';

export interface SearchUserProfileParams extends PaginationParams {
  search?: string;
}

export interface SearchAssignableUsersParams extends PaginationParams {
  search?: string;
}

import {PaginationParams} from '../common';

export interface SearchUserProfileParams extends PaginationParams {
  search?: string;
}

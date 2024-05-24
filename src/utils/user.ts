type UserFullName = {
  first_name?: string;
  last_name?: string;
  username?: string;
  nickname?: string;
};

export const getUserFullName = <T extends UserFullName>(user?: T) => {
  let iUser = user ?? ({} as UserFullName);
  if (iUser.first_name) {
    if (iUser.last_name) {
      return `${iUser.first_name} ${iUser.last_name}`;
    }
    return `${iUser.first_name}`;
  }
  return iUser.username || iUser.nickname || '';
};

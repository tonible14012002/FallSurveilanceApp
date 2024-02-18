export const ROOM_PERMISSIONS = {
  ACCESS: 'ACCESS',
  ASSIGN: 'ASSIGN',
  DELETE: 'DELETE',
  RECEIVE_NOTIFICATION: 'RECEIVE_NOTIFICATION',
  REMOVE_MEMBER: 'REMOVE_MEMBER',
  ASSIGN_ROOM_PERMISSION: 'ASSIGN_ROOM_PERMISSION',
} as const;

export type RoomPermission =
  (typeof ROOM_PERMISSIONS)[keyof typeof ROOM_PERMISSIONS];

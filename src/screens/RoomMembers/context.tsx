import {createContext, useContext, useMemo, useState} from 'react';

interface RoomMembersContextValue {
  roomId?: string;
  setRoomId: (_: string | undefined) => void;
  backScreenName?: string;
  setBackScreenName: (_: string | undefined) => void;
}

const RoomMemberContext = createContext<RoomMembersContextValue>({
  setRoomId: (_: string | undefined) => {},
  setBackScreenName: (_: string | undefined) => {},
});
export const useRoomMemberContext = () => useContext(RoomMemberContext);

export const RoomMemberContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [roomId, setRoomId] = useState<string>();
  const [backScreenName, setBackScreenName] = useState<string>();
  const contextValue = useMemo(
    () => ({roomId, setRoomId, backScreenName, setBackScreenName}),
    [backScreenName, roomId],
  );
  return (
    <RoomMemberContext.Provider value={contextValue}>
      {children}
    </RoomMemberContext.Provider>
  );
};

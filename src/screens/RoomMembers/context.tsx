import {createContext, useContext, useMemo, useState} from 'react';

interface RoomMembersContextValue {
  roomId?: string;
  setRoomId: (_: string | undefined) => void;
  backScreenName?: string;
  setBackSceenName: (_: string | undefined) => void;
}

const RoomMemberContext = createContext<RoomMembersContextValue>({
  setRoomId: (_: string | undefined) => {},
  setBackSceenName: (_: string | undefined) => {},
});
export const useRoomMemberContext = () => useContext(RoomMemberContext);

export const RoomMemberContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [roomId, setRoomId] = useState<string>();
  const [backScreenName, setBackSceenName] = useState<string>();
  const contextValue = useMemo(
    () => ({roomId, setRoomId, backScreenName, setBackSceenName}),
    [backScreenName, roomId],
  );
  return (
    <RoomMemberContext.Provider value={contextValue}>
      {children}
    </RoomMemberContext.Provider>
  );
};

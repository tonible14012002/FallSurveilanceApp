import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useAuthContext} from '~/context/auth';

interface HouseDetailContextValue {
  houseId?: string;
  setHouseId: (_: string) => void;
}

const HouseDetailContext = createContext<HouseDetailContextValue>({
  setHouseId: (_: string) => {},
  houseId: undefined,
});

export const useHouseDetailContext = () => useContext(HouseDetailContext);

export const HouseDetailContextProvider = (props: PropsWithChildren) => {
  const [houseId, setHouseId] = useState<string>();
  const {user} = useAuthContext();

  const contextValue = useMemo(
    () => ({
      houseId,
      setHouseId,
    }),
    [houseId],
  );

  useEffect(() => {
    setHouseId(undefined);
  }, [user?.id]);

  return (
    <HouseDetailContext.Provider value={contextValue}>
      {props.children}
    </HouseDetailContext.Provider>
  );
};

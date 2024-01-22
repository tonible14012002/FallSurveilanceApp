import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

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

  const contextValue = useMemo(
    () => ({
      houseId,
      setHouseId,
    }),
    [houseId],
  );

  return (
    <HouseDetailContext.Provider value={contextValue}>
      {props.children}
    </HouseDetailContext.Provider>
  );
};

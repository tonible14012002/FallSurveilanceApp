import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type {User} from '~/schema/api/identity';
import jwtManager from '~/libs/jwt/jwtManager';
import {mutate} from 'swr';

export type AuthContextValue = {
  user?: User;
  setUser: (_: User) => void;
  logout?: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  setUser: (_: User) => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const logout = useCallback(async () => {
    await mutate(
      _ => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      {revalidate: false}, // do not revalidate
    );
    setUser(undefined);
    jwtManager.clearRefreshToken();
    jwtManager.clearToken();
  }, []);

  const authState = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [logout, user],
  );

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

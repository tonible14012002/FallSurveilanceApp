import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type {LoginResponse, User} from '~/schema/api/identity';
import jwtManager from '~/libs/jwt/jwtManager';
import {API, API_PATH, loginApi, logoutApi} from '~/constants/api';
import {BaseResponse} from '~/schema/common';
import {LoginFormSchemaType} from '~/schema/form';
import {useSWRConfig} from 'swr';

export type AuthContextValue = {
  user?: User;
  setUser: (_: User | undefined) => void;
  logout?: () => void;
  login?: (_: LoginFormSchemaType) => Promise<User | undefined>;
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  setUser: (_: User | undefined) => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const {mutate} = useSWRConfig();

  const login = useCallback(
    async (data: LoginFormSchemaType) => {
      const resp = await API.FALL_SURVEILANCE.post(
        data,
        API_PATH.IDENTITY_SERVICES.LOGIN,
      ).json<BaseResponse<LoginResponse>>(r => r);

      const {user: respUser, access, refresh} = resp.data;
      jwtManager.setToken(access);
      jwtManager.setRefreshToken(refresh);
      setUser(respUser);
      loginApi(access);
      mutate(
        _ => true, // which cache keys are updated
        undefined, // update cache data to `undefined`
        {revalidate: false}, // do not revalidate
      );
      return respUser;
    },
    [mutate],
  );

  const logout = useCallback(async () => {
    mutate(
      _ => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      {revalidate: false}, // do not revalidate
    );
    jwtManager.clearRefreshToken();
    jwtManager.clearToken();
    setUser(undefined);
    logoutApi();
  }, [mutate]);

  const authState = useMemo(
    () => ({
      user,
      setUser,
      logout,
      login,
    }),
    [logout, user, login],
  );

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

import {useNavigation} from '@react-navigation/native';
import {PropsWithChildren, useCallback, useEffect, useState} from 'react';
import {API, API_PATH, loginApi} from '~/constants/api';
import {PublicScreenProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {useIsMounted} from '~/hooks/common';
import jwtManager from '~/libs/jwt/jwtManager';
import {BaseResponse} from '~/schema/common';
import type {User} from '~/schema/api/identity';
import {ScreenSkeleton} from './ScreenSkeleton';

export const AuthGuard = ({children}: PropsWithChildren) => {
  const {user, setUser, logout} = useAuthContext();
  const navigation = useNavigation<PublicScreenProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMounted = useIsMounted();

  const handleTokenGuard = useCallback(async () => {
    const token = await jwtManager.getToken();
    const tokenIsValid = Boolean(token) && (await jwtManager.isTokenValid());
    const refreshTokenIsValid =
      Boolean(await jwtManager.getRefreshToken()) &&
      (await jwtManager.isRefreshTokenValid());
    const isAuth = tokenIsValid || refreshTokenIsValid;

    if (isAuth) {
      if (user) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      const getMyProfile = async () => {
        setIsLoading(true);
        loginApi(token as string);
        try {
          const result = await API.FALL_SURVEILANCE.post(
            {},
            API_PATH.IDENTITY_SERVICES.ME,
          ).json<BaseResponse<User>>(r => r);

          if (isMounted()) {
            setUser(result.data);
            setIsAuthenticated(true);
          }
        } catch (e) {
          console.log(e);
          setIsAuthenticated(false);
        } finally {
          if (isMounted()) {
            setIsLoading(false);
          }
        }
      };
      await getMyProfile();
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [
    isMounted,
    setUser,
    user,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    jwtManager.getToken(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    jwtManager.getRefreshToken(),
  ]);

  useEffect(() => {
    handleTokenGuard();
  }, [handleTokenGuard]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      logout?.();
      navigation.navigate('Login');
    } else {
      navigation.navigate('Private');
    }
  }, [isAuthenticated, isLoading, logout, navigation]);

  if (isLoading || user === undefined) {
    return <ScreenSkeleton />;
  }
  return <>{children}</>;
};

export default AuthGuard;

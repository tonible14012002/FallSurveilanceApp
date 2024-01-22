import {useNavigation} from '@react-navigation/native';
import {PropsWithChildren, useCallback, useEffect, useState} from 'react';
import {API, API_PATH} from '~/constants/api';
import {PublicScreenProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {useIsMounted} from '~/hooks/common';
import jwtManager from '~/libs/jwt/jwtManager';
import {BaseResponse} from '~/schema/common';
import {User} from '~/schema/identity';
import {ScreenSkeleton} from './ScreenSkeleton';

export const AuthGuard = ({children}: PropsWithChildren) => {
  const {user, setUser} = useAuthContext();
  const navigation = useNavigation<PublicScreenProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMounted = useIsMounted();

  const handleTokenGuard = useCallback(async () => {
    const tokenIsValid =
      (await jwtManager?.getToken()) && (await jwtManager?.isTokenValid());
    const refreshTokenIsValid =
      (await jwtManager?.getRefreshToken()) &&
      (await jwtManager?.isRefreshTokenValid());
    const isAuth = tokenIsValid || refreshTokenIsValid;

    if (isAuth) {
      console.log('isAuthed');
      if (user) {
        setIsAuthenticated(true);
        return;
      }

      const getMyProfile = async () => {
        try {
          setIsLoading(true);
          const result = await API.FALL_SURVEILANCE.get(
            API_PATH.IDENTITY_SERVICES.ME,
          ).json<BaseResponse<User>>(r => r);

          if (isMounted()) {
            setUser(result.data);
            setIsAuthenticated(true);
          }
        } catch (e) {
          setIsAuthenticated(false);
        } finally {
          if (isMounted()) {
            setIsLoading(false);
          }
        }
      };
      getMyProfile();
    } else {
      console.log('not Authed');
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [isMounted, setUser, user]);

  useEffect(() => {
    handleTokenGuard();
  }, [handleTokenGuard]);

  useEffect(() => {
    console.log('Run navigate to Login', {isLoading, isAuthenticated});
    if (!isLoading && !isAuthenticated) {
      console.log('navigated to login');
      navigation.navigate('Login');
    }
  }, [isAuthenticated, isLoading, navigation]);

  if (!isLoading || !isAuthenticated) {
    return <ScreenSkeleton />;
  }
  return <>{children}</>;
};

export default AuthGuard;

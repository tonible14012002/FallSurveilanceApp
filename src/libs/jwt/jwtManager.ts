import {jwtDecode} from 'jwt-decode';
import * as KeyChain from 'react-native-keychain';

const EMPTY = 'EMPTY';

// FIXME: use native storage instead
const JWTManager = () => {
  const setToken = async (token: string) => {
    KeyChain.setInternetCredentials('JWT', 'JWT', token);
  };
  const getToken = async () => {
    const result = await KeyChain.getInternetCredentials('JWT');
    if (result) {
      return result.password === EMPTY ? false : result.password;
    }
    return false;
  };

  const clearToken = async () => {
    await KeyChain.setInternetCredentials('JWT', 'JWT', 'EXPIRED');
  };

  const clearRefreshToken = async () => {
    await KeyChain.setInternetCredentials('RefreshJWT', 'RefreshJWT', EMPTY);
  };

  const setRefreshToken = async (token: string) =>
    KeyChain.setInternetCredentials('RefreshJWT', 'RefreshJWT', token);

  const getRefreshToken = async () => {
    const result = await KeyChain.getInternetCredentials('RefreshJWT');
    if (result) {
      return result.password === EMPTY ? false : result.password;
    }
    return false;
  };

  const isTokenValid = async () => {
    // Note: Must Check Token is not empty first
    const token = (await getToken()) as string;
    try {
      const {exp: expiration} = jwtDecode(token);
      if (expiration) {
        const expirationTimeInSeconds = expiration * 1000;
        const now = new Date().getTime();
        return expirationTimeInSeconds > now;
      }
      return false;
    } catch (e) {
      console.log(e);
      clearToken();
      return false;
    }
  };
  const isRefreshTokenValid = async () => {
    try {
      const {exp: expiration} = jwtDecode((await getRefreshToken()) as string);
      if (expiration) {
        const expirationTimeInSeconds = expiration * 1000;
        const now = new Date().getTime();
        return expirationTimeInSeconds > now;
      }
      return false;
    } catch (e) {
      console.log(e);
      clearRefreshToken();
      return false;
    }
  };

  const getTokenKey = () => 'JWT';

  return {
    setToken,
    getToken,
    setRefreshToken,
    getRefreshToken,
    isTokenValid,
    isRefreshTokenValid,
    clearRefreshToken,
    clearToken,
    getTokenKey,
  };
};

export default JWTManager();

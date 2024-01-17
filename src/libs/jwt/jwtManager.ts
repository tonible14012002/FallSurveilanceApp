// import {jwtDecode} from 'jwt-decode';

// FIXME: use native storage instead

const JWTManager = () => {
  // const setToken = (token: string) => {
  //   localStorage.setItem('JWT', token);
  // };
  // const getToken = () => {
  //   return localStorage.getItem('JWT') ?? '';
  // };
  // const clearToken = () => {
  //   localStorage.setItem('JWT', '');
  // };
  // const clearRefreshToken = () => {
  //   localStorage.setItem('RefreshJWT', '');
  // };
  // const setRefreshToken = (token: string) =>
  //   localStorage.setItem('RefreshJWT', token);
  // const getRefreshToken = () => localStorage.getItem('RefreshJWT') ?? '';
  // const isTokenValid = () => {
  //   const {exp: expiration} = jwtDecode(getToken());
  //   if (expiration) {
  //     const expirationTimeInSeconds = expiration * 1000;
  //     const now = new Date().getTime();
  //     return expirationTimeInSeconds > now;
  //   }
  //   return false;
  // };
  // const isRefreshTokenValid = () => {
  //   const {exp: expiration} = jwtDecode(getRefreshToken());
  //   if (expiration) {
  //     const expirationTimeInSeconds = expiration * 1000;
  //     const now = new Date().getTime();
  //     return expirationTimeInSeconds > now;
  //   }
  //   return false;
  // };
  // const getTokenKey = () => 'JWT';
  // return {
  //   setToken,
  //   getToken,
  //   setRefreshToken,
  //   getRefreshToken,
  //   isTokenValid,
  //   isRefreshTokenValid,
  //   clearRefreshToken,
  //   clearToken,
  //   getTokenKey,
  // };
};

export default JWTManager();

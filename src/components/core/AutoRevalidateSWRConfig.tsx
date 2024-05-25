import React from 'react';
import {PropsWithChildren} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {SWRConfig} from 'swr';

export const AutoRevalidateSWRConfig = ({children}: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        initFocus(callback) {
          let appState = AppState.currentState;
          const onAppStateChange = (nextAppState: AppStateStatus) => {
            if (
              appState.match(/inactive|background/) &&
              nextAppState === 'active'
            ) {
              callback();
            }
            appState = nextAppState;
          };
          const subscription = AppState.addEventListener(
            'change',
            onAppStateChange,
          );

          return () => {
            subscription.remove();
          };
        },
      }}>
      {children}
    </SWRConfig>
  );
};

export default AutoRevalidateSWRConfig;

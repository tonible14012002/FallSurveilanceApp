import * as eva from '@eva-design/eva';
import '@react-native-anywhere/polyfill-base64';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React from 'react';
import 'react-native-gesture-handler';
import {HouseDetailContextProvider} from '~/components/HouseDetail';
import AuthGuard from '~/components/auth/AuthGuard';
import BottomTabBar from '~/components/core/BottomTabBar';
import {
  privateRoutes,
  privateTabRoutes,
  publicRoutes,
} from '~/constants/routes';
import {AuthProvider} from '~/context/auth';
import PopupProvider from '~/context/popup';
import {
  PrivateNavigator,
  PrivateScreen,
  PrivateTabNavigator,
  PrivateTabScreen,
  PublicNavigator,
  PublicScreen,
} from '~/libs/navigation';

const PrivateTabScreens = () => {
  return (
    <PrivateTabNavigator tabBar={BottomTabBar}>
      {privateTabRoutes.map(route => (
        <PrivateTabScreen
          key={route.name}
          name={route.name}
          component={route.screen}
          options={route?.options}
        />
      ))}
    </PrivateTabNavigator>
  );
};

const PrivateScreens = () => {
  return (
    <AuthProvider>
      <AuthGuard>
        <HouseDetailContextProvider>
          <PrivateNavigator>
            <PrivateScreen
              key="Main"
              name="Main"
              component={PrivateTabScreens}
              options={{headerShown: false}}
            />
            {privateRoutes.map(route => (
              <PrivateScreen
                key={route.name}
                name={route.name}
                component={route.screen}
                options={route?.options}
              />
            ))}
          </PrivateNavigator>
        </HouseDetailContextProvider>
      </AuthGuard>
    </AuthProvider>
  );
};

function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <PopupProvider>
          <PublicNavigator>
            {publicRoutes.map(route => (
              <PublicScreen
                key={route.name}
                name={route.name}
                component={route.screen}
                options={route?.options}
              />
            ))}
            <PublicScreen
              key="Private"
              name="Private"
              component={PrivateScreens}
              options={{headerShown: false}}
            />
          </PublicNavigator>
        </PopupProvider>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;

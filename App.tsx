import '@react-native-anywhere/polyfill-base64';
import React from 'react';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {
  privateRoutes,
  privateTabRoutes,
  publicRoutes,
} from '~/constants/routes';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  PrivateNavigator,
  PrivateScreen,
  PrivateTabNavigator,
  PrivateTabScreen,
  PublicNavigator,
  PublicScreen,
} from '~/libs/navigation';
import BottomTabBar from '~/components/core/BottomTabBar';
import {HouseDetailContextProvider} from '~/components/HouseDetail';
import {AuthProvider} from '~/context/auth';
import AuthGuard from '~/components/auth/AuthGuard';

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
            {privateRoutes.map(route => (
              <PrivateScreen
                key={route.name}
                name={route.name}
                component={route.screen}
                options={route?.options}
              />
            ))}
            <PrivateScreen
              key="Main"
              name="Main"
              component={PrivateTabScreens}
              options={{headerShown: false}}
            />
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
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;

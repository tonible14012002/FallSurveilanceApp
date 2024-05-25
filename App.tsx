import * as eva from '@eva-design/eva';
import '@react-native-anywhere/polyfill-base64';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {HouseDetailContextProvider} from '~/components/HouseDetail';
import AuthGuard from '~/components/auth/AuthGuard';
import AutoRevalidateSWRConfig from '~/components/core/AutoRevalidateSWRConfig';
import BottomTabBar from '~/components/core/BottomTabBar';
import {
  privateRoutes,
  privateTabRoutes,
  publicRoutes,
} from '~/constants/routes';
import {AuthProvider} from '~/context/auth';
import PopupProvider from '~/context/popup';
import ToastUtils, {includeToast} from '~/context/toast';
import {
  PrivateNavigator,
  PrivateScreen,
  PrivateTabNavigator,
  PrivateTabScreen,
  PublicNavigator,
  PublicScreen,
} from '~/libs/navigation';

LogBox.ignoreLogs([
  'source.uri should not be an empty string',
  'ReactImageView: Image source "" doesn\'t exist',
]); // Ignore log notification by message

const PrivateTabScreens = () => {
  return (
    <PrivateTabNavigator tabBar={BottomTabBar} initialRouteName="Home">
      {privateTabRoutes.map(route => (
        <PrivateTabScreen
          key={route.name}
          name={route.name}
          component={includeToast(route.screen)} // TODO: Fix toast cannot be displayed if specify on context layer
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
          <PrivateNavigator initialRouteName="Main">
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
    <GestureHandlerRootView style={{flex: 1}}>
      <AutoRevalidateSWRConfig />
      <ToastUtils />
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer>
          <PopupProvider>
            <ToastUtils />
            <PublicNavigator initialRouteName="Private">
              {publicRoutes.map(route => (
                <PublicScreen
                  key={route.name}
                  name={route.name}
                  component={route.screen} // TODO: Fix toast cannot be displayed if specify on context layer
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
    </GestureHandlerRootView>
  );
}

export default App;

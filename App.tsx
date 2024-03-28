import 'react-native-gesture-handler';
import '@react-native-anywhere/polyfill-base64';
import React, {useEffect, useState} from 'react';
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
import {
  requestUserPermission,
  notificationListener,
  unsubscribe,
} from '~/libs/notification';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestUserPermission(setIsLoading);
    notificationListener();
    return () => {
      unsubscribe();
    };
  }, []);

  // if (isLoading) return <Text>Loading...</Text>;

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNDgyODUxLCJpYXQiOjE3MTE2MTg4NTEsImp0aSI6IjVjYTZmMGI5MzIzNzRlOTFhMTFjZGRkOWViNzMyZGI3IiwidXNlcl9pZCI6IjhiMzA1OGY3LTY1NjQtNGNlMS1iY2U0LWJhNWViN2RkOTE0OSJ9.Fa6Y2OzuxF-t3SC484iuSgW6DAxU4K2Zp7Lhnzd0gVU',
    );

    const raw = '';

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(
      'http://14.225.204.127/api/house-services/houses/70652d4e-034d-45b4-a527-0929f6afa1fc/add-members/search/?pageSize=20&page=1',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  }, []);

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

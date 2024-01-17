import React from 'react';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider} from '@ui-kitten/components';
import {publicRoutes} from '~/constants/routes';
import {PublicNavigator, PublicScreen} from '~/libs/navigation';

function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <PublicNavigator>
          {publicRoutes.map(route => (
            <PublicScreen
              key={route.name}
              name={route.name}
              component={route.screen}
              options={route.options}
            />
          ))}
        </PublicNavigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;

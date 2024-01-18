import React from 'react';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {publicRoutes} from '~/constants/routes';
import {PublicNavigator, PublicScreen} from '~/libs/navigation';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
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
    </>
  );
}

export default App;

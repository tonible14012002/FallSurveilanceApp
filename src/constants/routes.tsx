import {StackScreenProps} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import {ElementType} from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';

interface RouteItem extends Record<string, any> {
  screen: ElementType<StackScreenProps<any>>;
  name: string;
  options?: StackNavigationOptions;
}

const publicRoutes: RouteItem[] = [
  {
    screen: Login,
    name: 'Login',
    options: {
      headerShown: true,
    },
  },
];

export {publicRoutes};

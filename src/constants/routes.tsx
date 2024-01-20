import {StackScreenProps} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
import {ElementType} from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import Register from '~/screens/Register/Register';

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
      headerShown: false,
    },
  },
  {
    screen: Register,
    name: 'Register',
    options: {
      headerShown: false,
    },
  },
];

export {publicRoutes};

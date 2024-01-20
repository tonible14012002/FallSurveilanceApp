import {StackScreenProps} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
import {ElementType} from 'react';
import Register from '~/screens/Register/Register';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import Notification from '~/screens/Notification/Notification';

interface RouteItem extends Record<string, any> {
  screen: ElementType<StackScreenProps<any>>;
  name: string;
  options?: BottomTabNavigationOptions;
}

const publicRoutes: RouteItem[] = [
  {
    screen: Home,
    name: 'Home',
    options: {
      headerShown: false,
    },
  },
  {
    screen: Notification,
    name: 'Notification',
    options: {
      headerShown: false,
    },
  },
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

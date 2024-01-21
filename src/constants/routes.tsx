import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import Register from '~/screens/Register/Register';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import Home from '~/screens/Home/Home';
import Login from '~/screens/Login/Login';
import Notification from '~/screens/Notification/Notification';

export type PublicRouteParamList = {
  Login: undefined;
  Register: undefined;
  Private: undefined;
};

export type PrivateRouteParamList = {
  Main: undefined;
  // Add Modal Screen
};

export type PrivateBottomRouteParamList = {
  Home: undefined;
  Notification: undefined;
  // Bottom Tab Screen
};

export type PublicScreenProps<
  T extends keyof PublicRouteParamList = keyof PublicRouteParamList,
> = StackNavigationProp<PublicRouteParamList, T>;

export type PrivateScreenWithoutBottomBarProps<
  T extends keyof PrivateRouteParamList = keyof PrivateRouteParamList,
> = StackNavigationProp<PrivateRouteParamList, T>;

export type PrivateScreenWithBottomBarProps<
  T extends keyof PrivateRouteParamList = keyof PrivateRouteParamList,
  Y extends keyof PrivateBottomRouteParamList = keyof PrivateBottomRouteParamList,
> = CompositeNavigationProp<
  StackNavigationProp<PrivateRouteParamList, T>,
  BottomTabNavigationProp<PrivateBottomRouteParamList, Y>
>;

interface RouteItem<
  ParamList extends Record<string, undefined>,
  NavigationOptions extends
    | BottomTabNavigationOptions
    | StackNavigationOptions = StackNavigationOptions,
> {
  screen: React.FC;
  name: keyof ParamList;
  options?: NavigationOptions;
}

type PublicRouteItem = RouteItem<PublicRouteParamList, StackNavigationOptions>;
type PrivateRouteItem = RouteItem<
  PrivateRouteParamList,
  StackNavigationOptions
>;

type PrivateTabRouteItem = RouteItem<
  PrivateBottomRouteParamList,
  BottomTabNavigationOptions
>;

const publicRoutes: PublicRouteItem[] = [
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

const privateRoutes: PrivateRouteItem[] = [];

const privateTabRoutes: PrivateTabRouteItem[] = [
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
];

export {publicRoutes, privateRoutes, privateTabRoutes};

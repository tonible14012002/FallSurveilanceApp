import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  RegisterScreen,
  NotificationScreen,
  LoginScreen,
  HomeScreen,
  AccountScreen,
  HouseDetailScreen,
} from '~/screens';
import {} from '~/screens';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {AddHouseScreen} from '~/screens/AddHouse';
import {RoomDetailScreen} from '~/screens/RoomDetail';
import {RoomMembers} from '~/screens/RoomMembers';
import {AddHouseMembers} from '~/screens/AddHouseMembers';

// NOTE: add public screen for Stack navigation here
// EX: Login, Register, Forget Password, OTP, ...
export type PublicRouteParamList = {
  Login: undefined;
  Register: undefined;
  Private: undefined; // NOTE: navigate to Private Router
};

// NOTE: add private screen for Stack navigation here
// EX: Modal screen, ...
export type PrivateRouteParamList = {
  Main: undefined; // NOTE: navigate to Private Bottom Tab Router
  Home: undefined;
  AddHouse: undefined;
  RoomMembers: {roomId: string; backScreenName?: string};
  AddHouseMembers: undefined;
};

// NOTE: add private screen for Bottom Tab here
export type PrivateBottomRouteParamList = {
  Home: undefined;
  Notification: undefined;
  Account: undefined;
  HouseDetail: undefined;
  RoomDetail: {roomId: string};
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
  ParamList extends Record<string, any>,
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
    screen: LoginScreen,
    name: 'Login',
    options: {
      headerShown: false,
    },
  },
  {
    screen: RegisterScreen,
    name: 'Register',
    options: {
      headerShown: false,
    },
  },
];

const privateRoutes: PrivateRouteItem[] = [
  {
    screen: AddHouseScreen,
    name: 'AddHouse',
    options: {
      headerShown: false,
    },
  },
  {
    screen: RoomMembers,
    name: 'RoomMembers',
    options: {
      headerShown: false,
    },
  },
  {
    screen: AddHouseMembers,
    name: 'AddHouseMembers',
    options: {
      headerShown: false,
    },
  },
];

const privateTabRoutes: PrivateTabRouteItem[] = [
  {
    screen: HomeScreen,
    name: 'Home',
    options: {
      headerShown: false,
    },
  },
  {
    screen: NotificationScreen,
    name: 'Notification',
    options: {
      headerShown: false,
    },
  },
  {
    screen: HouseDetailScreen,
    name: 'HouseDetail',
    options: {
      headerShown: false,
    },
  },
  {
    screen: AccountScreen,
    name: 'Account',
    options: {
      headerShown: false,
    },
  },
  {
    screen: RoomDetailScreen,
    name: 'RoomDetail',
    options: {
      headerShown: false,
    },
  },
];

export {publicRoutes, privateRoutes, privateTabRoutes};

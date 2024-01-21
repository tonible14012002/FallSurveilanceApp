import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PrivateBottomRouteParamList} from '~/constants/routes';

const {Navigator: PrivateTabNavigator, Screen: PrivateTabScreen} =
  createBottomTabNavigator<PrivateBottomRouteParamList>();

export {PrivateTabScreen, PrivateTabNavigator};

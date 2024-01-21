import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;

const BellIcon = (props: any) => <Icon {...props} name="bell-outline" />;

export default function BottomTabBar({navigation, state}: BottomTabBarProps) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={BellIcon} />
      <BottomNavigationTab icon={BellIcon} />
    </BottomNavigation>
  );
}

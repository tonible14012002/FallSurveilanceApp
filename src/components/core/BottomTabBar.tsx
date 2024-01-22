import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;

const BellIcon = (props: any) => <Icon {...props} name="bell-outline" />;

const VideoIcon = (props: any) => <Icon {...props} name="video-outline" />;

const UserIcon = (props: any) => <Icon {...props} name="person-outline" />;

export default function BottomTabBar({navigation, state}: BottomTabBarProps) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={BellIcon} />
      <BottomNavigationTab icon={VideoIcon} />
      <BottomNavigationTab icon={UserIcon} />
    </BottomNavigation>
  );
}

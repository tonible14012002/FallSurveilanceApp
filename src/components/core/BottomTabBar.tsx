import {
  Avatar,
  BottomNavigation,
  BottomNavigationProps,
  BottomNavigationTab,
  Icon,
  Layout,
} from '@ui-kitten/components';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import COLORS from '~/constants/colors';
import LogoImg from '../../assets/images/logo.png';

const HomeIcon = (props: any) => (
  <Icon
    {...props}
    name="home-outline"
    fill={props.selected ? COLORS.yellow : 'rgba(255,255,255,0.5)'}
  />
);

const BellIcon = (props: any) => (
  <Icon
    {...props}
    name="bell-outline"
    fill={props.selected ? COLORS.yellow : 'rgba(255,255,255,0.5)'}
  />
);

const AvatarIcon = ({selected}: any) => {
  const style = selected
    ? {
        borderWidth: 1,
        borderColor: COLORS.yellow,
        borderRadius: 50,
        padding: 0.5,
      }
    : {};
  return (
    <Layout style={style}>
      <Avatar source={LogoImg} size="small" />
    </Layout>
  );
};

export default function BottomTabBar({
  navigation,
  state,
}: {
  navigation: any;
  state: any;
}) {
  return (
    <>
      <BottomNavigation
        style={styles.bottomNavigation}
        indicatorStyle={{display: 'none'}}
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab
          icon={(props: any) => (
            <HomeIcon {...props} selected={state.index === 0} />
          )}
        />
        <BottomNavigationTab
          icon={(props: any) => (
            <BellIcon {...props} selected={state.index === 1} />
          )}
        />
        <BottomNavigationTab
          icon={<AvatarIcon selected={state.index === 2} />}
        />
      </BottomNavigation>
    </>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: '#222831',
    color: 'red',
  },
});

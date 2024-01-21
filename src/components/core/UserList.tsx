import {ScrollView, StyleSheet, View} from 'react-native';

interface UserListProps {
  children?: React.ReactNode;
  detailNavigator?: React.ReactNode;
  containerStyle?: Object;
  listStyle?: Object;
}

export default function UserList(props: UserListProps) {
  const {
    children = null,
    detailNavigator = null,
    containerStyle = {},
    listStyle = {},
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView horizontal contentContainerStyle={[styles.list, listStyle]}>
        {children}
      </ScrollView>
      {detailNavigator}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

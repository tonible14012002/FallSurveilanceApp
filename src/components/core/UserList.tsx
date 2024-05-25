import {ScrollView, StyleSheet, View} from 'react-native';
import TextFallback from './TextFallback';

interface UserListProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  detailNavigator?: React.ReactNode;
  containerStyle?: Object;
  listStyle?: Object;
  listTitleStyle?: Object;
}

export default function UserList(props: UserListProps) {
  const {
    title = null,
    children = null,
    detailNavigator = null,
    containerStyle = {},
    listTitleStyle = {},
    listStyle = {},
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.listTitle, listTitleStyle]}>
        <TextFallback category="s2">{title as any}</TextFallback>
        {detailNavigator}
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={[styles.list, listStyle]}
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  listTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import {StyleSheet, View} from 'react-native';

interface ListProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  detailNavigator?: React.ReactNode;
  containerStyle?: Object;
  listStyle?: Object;
  listTitleStyle?: Object;
}

export default function List(props: ListProps) {
  const {
    title = null,
    children = null,
    detailNavigator = null,
    containerStyle = {},
    listStyle = {},
    listTitleStyle = {},
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.listTitle, listTitleStyle]}>
        {title}
        {detailNavigator}
      </View>
      <View style={[styles.list, listStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
  },
  listTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    display: 'flex',
    gap: 10,
  },
});

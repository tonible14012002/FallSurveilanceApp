import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

type ListProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  detailNavigator?: React.ReactNode;
  containerStyle?: Object;
  listStyle?: Object;
  listTitleStyle?: Object;
  scrollable?: boolean;
  horizontal?: boolean;
};

export default function List(props: ListProps) {
  const {
    title = null,
    children = null,
    detailNavigator = null,
    containerStyle = {},
    listStyle = {},
    listTitleStyle = {},
    scrollable = false,
    ...rest
  } = props;

  const Wrapper = scrollable ? ScrollView : View;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.listTitle, listTitleStyle]}>
        {title}
        {detailNavigator}
      </View>
      <Wrapper {...rest}>
        <View style={[styles.list, listStyle]}>{children}</View>
      </Wrapper>
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

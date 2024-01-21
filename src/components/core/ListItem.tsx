import {Layout} from '@ui-kitten/components';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface ListItemProps {
  containerStyle?: Object;
  infoStyle?: Object;
  leftIcon?: React.ReactNode;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  rightEle?: React.ReactNode;
  level?: string;
  onPressHandler?: (event: GestureResponderEvent) => void;
}

export default function ListItem(props: ListItemProps) {
  const {
    title,
    leftIcon: LeftIcon = null,
    rightEle = null,
    subTitle = null,
    containerStyle = {},
    infoStyle = {},
    level = '1',
    onPressHandler = () => {},
  } = props;

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <Layout style={[styles.container, containerStyle]} level={level}>
        <View style={[styles.itemTitle, infoStyle]}>
          {LeftIcon}
          <View>
            {title}
            {subTitle}
          </View>
        </View>

        {rightEle}
      </Layout>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 25,
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemSubTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

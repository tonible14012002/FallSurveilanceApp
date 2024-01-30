import {Layout} from '@ui-kitten/components';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TextFallback from './TextFallback';

interface TabItemProps {
  containerStyle?: Object;
  icon?: React.ReactNode;
  title: React.ReactNode;
  level?: string;
  iconPosition?: 'top' | 'bottom';
  onPressHandler?: (event: GestureResponderEvent) => void;
}

export default function TabItem(props: TabItemProps) {
  const {
    title,
    icon: Icon = null,
    containerStyle = {},
    level = '3',
    iconPosition = 'top',
    onPressHandler = () => {},
  } = props;

  const flexDirection = iconPosition === 'bottom' ? 'column-reverse' : 'column';

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <Layout
        style={[{...styles.container, flexDirection}, containerStyle]}
        level={level}>
        {Icon}
        <TextFallback category="s2">{title as any}</TextFallback>
      </Layout>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    padding: 15,
    borderRadius: 25,
  },
});

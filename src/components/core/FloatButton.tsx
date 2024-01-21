import {Button, Icon as KittenIcon, Text} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import {ImageProps} from 'react-native-svg';

interface FloatButtonrops {
  title?: string;
  icon?: RenderProp<Partial<ImageProps>>;
  iconPosition?: 'left' | 'right';
  style?: Object;
  pressHandler: (event: GestureResponderEvent) => void;
}

export default function FloatButton(props: FloatButtonrops) {
  const {
    title = 'Add',
    icon: Icon = <KittenIcon name="plus" style={{width: 16, height: 16}} />,
    iconPosition = 'left',
    style = {},
    pressHandler,
  } = props;

  const iconPositionProp =
    iconPosition === 'left' ? {accessoryLeft: Icon} : {accessoryRight: Icon};

  return (
    <Button
      {...iconPositionProp}
      onPress={pressHandler}
      style={[styles.container, style]}
      status="warning">
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    width: 90,
    gap: -10,
    borderRadius: 15,
  },
});

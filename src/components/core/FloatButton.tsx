import {Button, Icon as KittenIcon} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {ImageProps} from 'react-native-svg';

interface FloatButtonrops {
  icon?: RenderProp<Partial<ImageProps>>;
  iconPosition?: 'left' | 'right';
  style?: Object;
  pressHandler: (event: GestureResponderEvent) => void;
}

export default function FloatButton(props: FloatButtonrops) {
  const {
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
      status="primary"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    width: 56,
    borderRadius: 1000,
    elevation: 10,
  },
});

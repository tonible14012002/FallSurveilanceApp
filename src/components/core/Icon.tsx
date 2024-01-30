import {
  type IconProps as PrimitiveIconProps,
  Icon as PrimitiveIcon,
} from '@ui-kitten/components';

interface IconProps extends PrimitiveIconProps {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant' | 'superGiant';
}

export default function Icon(props: IconProps) {
  const {size = 'medium', ...restProps} = props;
  const iconSize = {
    tiny: 12,
    small: 16,
    medium: 20,
    large: 24,
    giant: 28,
    superGiant: 40,
  }[size];
  return <PrimitiveIcon {...restProps} width={iconSize} height={iconSize} />;
}

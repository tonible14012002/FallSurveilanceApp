import {Icon, IconProps} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from 'react-native';

export const PROFILE_KEY = 'PROFILE_KEY';

export const useRenderIcon = () => {
  const renderIcon = (iconName: string) => {
    return (props: IconProps): React.ReactElement => {
      return (
        <TouchableWithoutFeedback>
          <Icon {...props} name={iconName} />
        </TouchableWithoutFeedback>
      );
    };
  };

  return {
    renderIcon,
  };
};

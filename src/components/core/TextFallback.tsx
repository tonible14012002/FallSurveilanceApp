import {ReactNode} from 'react';
import {Text, TextProps} from '@ui-kitten/components';

type TextFallbackProps = TextProps & {
  children: ReactNode;
};

export default function TextFallback(props: TextFallbackProps) {
  const {children, ...restProps} = props;
  if (typeof children === 'string') {
    return <Text {...restProps}>{children}</Text>;
  }
  return <>{children}</>;
}

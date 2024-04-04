import {Fragment} from 'react';
import {useNotificationListener} from '~/libs/hooks/useNotificationListener';

export const NotificationListenerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useNotificationListener();

  return <Fragment>{children}</Fragment>;
};

import {
  createContext,
  useState,
  cloneElement,
  useContext,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';
import {AlertPopup} from '~/components/Popups/AlertPopup';
import {FallDetectedPopup} from '~/components/Popups/FallDetectedPopup';
import {NotificationPopup} from '~/components/Popups/NotificationPopup';
import {PopUpLayout} from '~/components/Popups/PopupLayout';
import {useDisclosure} from '~/hooks/common';

export enum POPUPS {
  NOTIFICATION = 'notification',
  ALERT = 'alert',
  FALL_DETECTED = 'fall_detected',
}

type PopupContextValues = {
  showPopup: <T extends object>(name: POPUPS, props: T) => void;
  showPopupComponent: (element: ReactElement) => void;
  closePopup: () => void;
};

const POPUP_ELEMENTS: Record<POPUPS, ReactElement> = {
  [POPUPS.NOTIFICATION]: <NotificationPopup />,
  [POPUPS.ALERT]: <AlertPopup title="" description="" />,
  [POPUPS.FALL_DETECTED]: (
    <FallDetectedPopup title="" description="" image="" />
  ),
};

const defaultPopupContextValues: PopupContextValues = {
  showPopup: () => {},
  showPopupComponent: () => {},
  closePopup: () => {},
};

export const PopupContext = createContext(defaultPopupContextValues);

const PopupProvider = ({children}: {children: ReactNode}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [component, setComponent] = useState<ReactElement | null>(null);

  const showPopup = (name: POPUPS, props = {}) => {
    onOpen();
    setComponent(cloneElement(POPUP_ELEMENTS[name], props));
  };

  const showPopupComponent = (element: ReactElement) => {
    onOpen();
    setComponent(element);
  };

  const closePopup = () => {
    onClose();
    setComponent(null);
  };

  const value: PopupContextValues = useMemo(
    () => ({
      showPopup,
      showPopupComponent,
      closePopup,
    }),
    [],
  );

  return (
    <PopupContext.Provider value={value}>
      <PopUpLayout isOpen={isOpen} onClose={onClose}>
        {component}
      </PopUpLayout>
      {children}
    </PopupContext.Provider>
  );
};
const usePopupContext = () => useContext(PopupContext);

export {usePopupContext};
export default PopupProvider;

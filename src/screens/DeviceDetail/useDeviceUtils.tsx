import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {mutate} from 'swr';
import {API, API_PATH} from '~/constants/api';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useDisclosure} from '~/hooks/common';
import {BaseResponse} from '~/schema/common';

interface Props {
  deviceId: string;
  roomId: string;
}

export default function useDeviceUtils({deviceId, roomId}: Props) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const {
    isOpen: isOpenConfirmationModal,
    onClose: onCloseConfirmationModal,
    onOpen: onOpenConfirmationModal,
  } = useDisclosure();

  const {
    isOpen: isOpenEditDeviceModal,
    onClose: onCloseEditDeviceModal,
    onOpen: onOpenEditDeviceModal,
  } = useDisclosure();

  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();

  const handleDeleteDevice = async () => {
    try {
      setIsDeleteLoading(true);
      await API.FALL_SURVEILANCE.delete(
        API_PATH.DEVICE_SERVICES.MODIFY_DEVICE({roomId, id: deviceId}),
      ).json<BaseResponse<any>>(r => r);
    } catch (e) {
      setIsDeleteLoading(false);
      console.log(e);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return {
    isOpenConfirmationModal,
    onOpenConfirmationModal,
    onCloseConfirmationModal,
    isOpenEditDeviceModal,
    onOpenEditDeviceModal,
    onCloseEditDeviceModal,
    isDeleteLoading,
    handleDeleteDevice,
  };
}

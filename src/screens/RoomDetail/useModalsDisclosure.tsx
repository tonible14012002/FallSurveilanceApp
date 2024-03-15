import {useDisclosure} from '~/hooks/common';

const useModalsDisclosure = () => {
  const {
    isOpen: isOpenProfile,
    onClose: onCloseProfile,
    onOpen: onOpenProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenRoomsSelect,
    onClose: onCloseRoomsSelect,
    onOpen: onOpenRoomsSelect,
  } = useDisclosure();
  const {
    isOpen: isOpenRoomEdit,
    onClose: onCloseRoomEdit,
    onToggle: onToggleRoomEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenUserPermission,
    onClose: onCloseUserPermission,
    onToggle: onToggleUserPermission,
  } = useDisclosure();

  return {
    isOpenProfile,
    onCloseProfile,
    onOpenProfile,
    isOpenRoomsSelect,
    onCloseRoomsSelect,
    onOpenRoomsSelect,
    isOpenRoomEdit,
    onCloseRoomEdit,
    onToggleRoomEdit,
    isOpenUserPermission,
    onCloseUserPermission,
    onToggleUserPermission,
  };
};

export default useModalsDisclosure;

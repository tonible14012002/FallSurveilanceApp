import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Spinner, Text, useTheme} from '@ui-kitten/components';
import {Avatar} from '~/components/core/v2/Avatar';
import {View} from 'react-native';
import {ConfirmationModal} from '~/components/common/ConfimationModal';
import Icon from '~/components/core/Icon';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useFetchDeviceDetail} from '~/hooks/useFetchDeviceDetail';
import {boringAvatar} from '~/libs/utils';
import useDeviceUtils from './useDeviceUtils';
import {EditDeviceModal} from './EditDeviceModal';
import {mutate} from 'swr';
import {API_PATH} from '~/constants/api';
import {useVideoStreaming} from '~/libs/hooks/useVideoStreaming';
import {RTCView} from 'react-native-webrtc';
import {Skeleton} from '~/components/core/Skeleton';
import {getUserFullName} from '~/utils/user';
import {useAuthContext} from '~/context/auth';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {useDisclosure} from '~/hooks/common';
import {IconButton} from '~/components/core/IconButton';

export default function DeviceDetailScreen() {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const route = useRoute();
  const {deviceId, roomName} = route.params as {
    deviceId: string;
    roomName: string;
  };
  const {user} = useAuthContext();
  const theme = useTheme();
  const {detail} = useFetchDeviceDetail(deviceId, Boolean(deviceId));

  const {...spec} = detail?.specification ?? {};
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleNavigateRoomDetail = () =>
    navigate('RoomDetail', {roomId: detail?.room!});

  const handleNotificationInboxPressed = () => {
    if (!deviceId) {
      return;
    }
    navigate('DeviceNotification', {deviceId});
  };

  const {
    isOpenEditDeviceModal,
    isOpenConfirmationModal,
    onOpenEditDeviceModal,
    onOpenConfirmationModal,
    onCloseConfirmationModal,
    onCloseEditDeviceModal,
    isDeleteLoading,
    handleDeleteDevice,
  } = useDeviceUtils({
    deviceId,
    roomId: detail?.room!,
  });

  const onDelete = async () => {
    await handleDeleteDevice();
    onCloseConfirmationModal();
    mutate(API_PATH.HOUSE_SERVICES.HOUSE_DETAIL);
    handleNavigateRoomDetail();
  };

  const __renderHouseActionsBar = () => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16,
        gap: 16,
      }}>
      <IconButton
        icon={<Icon size="medium" name="trash-outline" />}
        onPress={onOpenConfirmationModal}
        width={42}
        height={42}
        style={{
          backgroundColor: theme['color-basic-200'],
        }}
      />
      <IconButton
        icon={<Icon size="medium" name="edit-outline" />}
        onPress={onOpenEditDeviceModal}
        width={42}
        height={42}
        style={{
          backgroundColor: theme['color-basic-200'],
        }}
      />

      <View style={{position: 'relative'}}>
        <IconButton
          onPress={handleNotificationInboxPressed}
          icon={<Icon size="medium" name="bell-outline" />}
          width={42}
          height={42}
          style={{
            backgroundColor: theme['color-basic-200'],
          }}
        />
        {/* DOT Indicator */}
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 10,
            height: 10,
            backgroundColor: 'red',
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );

  const {localStream} = useVideoStreaming();

  return (
    <>
      <ScreenLayout
        isScrollable
        hasPadding
        topBar={
          <TopBar
            onBack={handleNavigateRoomDetail}
            title={
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <Text category="h6">Device Detail</Text>
              </View>
            }
            rightIcon={
              <ProfileDropdown
                onClose={onClose}
                isOpen={isOpen}
                onOpen={onOpen}
                trigger={
                  <Avatar
                    label={getUserFullName(
                      user ?? {
                        first_name: 'Unknown',
                        last_name: 'User',
                      },
                    )}
                    source={{
                      uri: user?.avatar,
                    }}
                  />
                }
              />
            }
          />
        }>
        <View>{__renderHouseActionsBar()}</View>
        {/* <View style={{width: 400, height: 200, borderr}}> */}

        {/* </View> */}
        <View style={{gap: 16}}>
          {
            <View
              style={{
                marginLeft: 4,
                padding: 0,
                width: '98%',
                borderRadius: 8,
              }}>
              <View
                style={{
                  height: 240,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                {localStream ? (
                  <RTCView
                    streamURL={(localStream as any).toURL()}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      transform: [{scaleX: 1.5}],
                      bottom: 0,
                      top: 0,
                      backgroundColor: theme['color-basic-200'],
                    }}
                  />
                ) : (
                  <>
                    <Skeleton
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                      }}
                    />
                    <Spinner size="medium" />
                  </>
                )}
              </View>
            </View>
          }

          <View style={{gap: 8}}>
            <Text category="label">Name</Text>
            {detail?.name ? (
              <Text category="s2">{detail?.name}</Text>
            ) : (
              <Text category="s2" appearance="hint">
                - Empty
              </Text>
            )}
          </View>

          <View style={{gap: 8}}>
            <Text category="label">Room</Text>
            {detail?.room ? (
              <Text category="s2">{roomName ?? ''}</Text>
            ) : (
              <Text category="s2" appearance="hint">
                - Empty
              </Text>
            )}
          </View>

          <View style={{gap: 8}}>
            <Text category="label">Specification</Text>
            {Object.entries(spec ?? {}).map(([key, value]) => (
              <View style={{flexDirection: 'row', gap: 8}} key={key}>
                <Text category="c2" style={{textTransform: 'capitalize'}}>
                  {key.replace(/_/g, ' ')}:
                </Text>
                <Text category="label">{value}</Text>
              </View>
            ))}
          </View>

          <UserList
            containerStyle={{marginBottom: 30}}
            listStyle={{gap: 10}}
            title={
              <Text category="label">
                Members •{' '}
                <Text category="c2" appearance="hint">
                  {detail?.related_users.length ?? 0} members
                </Text>
              </Text>
            }
            detailNavigator={
              <Button
                style={{
                  borderRadius: 1000,
                  width: 35,
                  height: 35,
                }}
                appearance="ghost"
                onPress={() => {}}>
                <Icon name="chevron-right-outline" />
              </Button>
            }>
            {(detail?.related_users ?? []).map(mem => (
              <Avatar
                key={mem.id}
                source={{
                  uri: mem.avatar,
                }}
                label={getUserFullName(mem)}
                style={{width: 50, height: 50}}
                loadingIndicatorSource={{
                  uri: boringAvatar(mem.first_name),
                }}
              />
            ))}
            <Button
              style={{
                borderRadius: 1000,
                width: 50,
                height: 50,
              }}
              status="basic"
              onPress={() => {}}>
              <Icon name="plus" />
            </Button>
          </UserList>

          <ConfirmationModal
            title="Do you want to delete this device?"
            isLoading={isDeleteLoading}
            isOpen={isOpenConfirmationModal}
            onAccept={onDelete}
            onCancel={onCloseConfirmationModal}
          />

          <EditDeviceModal
            isOpen={isOpenEditDeviceModal}
            deviceId={deviceId}
            name={detail?.name ?? ''}
            roomId={detail?.room!}
            onClose={onCloseEditDeviceModal}
          />
        </View>
      </ScreenLayout>
    </>
  );
}

import {Button, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Icon from '~/components/core/Icon';
import TabItem from '~/components/core/TabItem';
import {useDisclosure} from '~/hooks/common';

export interface StepThreeProps {
  rooms: RoomSchema[];
  onRoomsChange: (rooms: RoomSchema[]) => void;
  onConfirm?: () => void;
}

export interface RoomSchema {
  id: string;
  name: string;
  description?: string;
}

const createIdGenerator = () => {
  let id = 0;
  return () => (++id).toString();
};

const genId = createIdGenerator();

export const StepThree = (props: StepThreeProps) => {
  const {rooms, onRoomsChange, onConfirm} = props;
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<RoomSchema | null>(null);

  const onSelectRoom = (room: RoomSchema) => {
    setName(room.name);
    setDescription(room.description ?? '');
    setSelectedRoom(room);
    onOpen();
  };

  const onUpdateRoom = () => {
    const rIndex = rooms.findIndex(r => r.id === selectedRoom?.id);
    if (rIndex !== -1) {
      rooms[rIndex] = {
        id: selectedRoom?.id ?? genId(),
        name,
        description,
      };
      onRoomsChange(rooms);
    }
    setSelectedRoom(null);
  };

  const onCreateNewRoom = () => {
    onRoomsChange([
      ...rooms,
      {
        id: genId(),
        name,
        description,
      },
    ]);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
  };

  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{gap: 8}}>
            <TabItem
              title="Create new room"
              icon={<Icon name="plus" />}
              containerStyle={{width: 200}}
              onPressHandler={() => {
                resetForm();
                onOpen();
              }}
            />
            {rooms.map(room => (
              <TabItem
                icon={<Icon name="home" />}
                containerStyle={{width: 200}}
                title={room.name}
                onPressHandler={() => onSelectRoom(room)}
              />
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            bottom: 0,
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: 'rgba(0,0,0,0.1)',
            marginTop: -16,
            marginHorizontal: -16,
          }}>
          <Button size="large" style={{width: '100%'}} onPress={onConfirm}>
            Confirm
          </Button>
        </View>
      </View>
      <Modal visible={isOpen} onBackdropPress={onClose}>
        <Layout
          style={{
            elevation: 2,
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 8,
            width: 380,
            gap: 16,
          }}>
          <View style={{gap: 8}}>
            <Text category="label" appearance="hint">
              Room name
            </Text>
            <Input value={name} onChangeText={setName} size="large" />
          </View>
          <View style={{gap: 8}}>
            <Text category="label" appearance="hint">
              Description
            </Text>
            <Input
              value={description}
              onChangeText={setDescription}
              multiline
              size="large"
            />
          </View>
          <Button
            size="large"
            onPress={() => {
              if (!selectedRoom) {
                onCreateNewRoom();
                resetForm();
                onClose();
                return;
              }
              onUpdateRoom();
              resetForm();
              onClose();
            }}>
            Done
          </Button>
        </Layout>
      </Modal>
    </>
  );
};

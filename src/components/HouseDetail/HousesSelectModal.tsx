import {Divider, Layout, List, Modal} from '@ui-kitten/components';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import {useHouseDetailContext} from './context';
import {useFetchJoinedHouses} from '~/hooks/useFetchJoinedHouses';
import {HouseInfo} from '~/schema/api/house';

interface HousesSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HousesSelectModal({isOpen, onClose}: HousesSelectModalProps) {
  const {houseId, setHouseId} = useHouseDetailContext();
  const {houses} = useFetchJoinedHouses();

  return (
    <Modal visible={isOpen} onBackdropPress={onClose}>
      <Layout
        style={{
          width: 380,
          maxHeight: 380,
          elevation: 3,
          borderRadius: 16,
          overflow: 'hidden',
        }}>
        <List
          data={houses ?? []}
          ItemSeparatorComponent={Divider}
          renderItem={({item: house}: {item: HouseInfo}) => (
            <ListItem
              onPressHandler={() => {
                setHouseId(house.id);
                onClose();
              }}
              title={house.name}
              subTitle={house.members.length + ' members'}
              rightEle={
                houseId === house.id ? (
                  <Icon size="small" name="checkmark-outline" />
                ) : null
              }
              wrapperStyle={{
                borderBottomColor: 'rgba(255,255,255,0.3)',
                borderBottomWidth: 1,
                backgroundColor: houseId === house.id ? '#FFE4C9' : '#FFF7F1',
              }}
            />
          )}
        />
      </Layout>
    </Modal>
  );
}

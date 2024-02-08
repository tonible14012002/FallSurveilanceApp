import {Divider, Layout, List, Modal} from '@ui-kitten/components';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import {useHouseDetailContext} from './context';
import {GetJoinedHousesResponse} from '~/schema/api/house';

interface HousesSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  houses: GetJoinedHousesResponse;
}

export function HousesSelectModal({
  isOpen,
  onClose,
  houses,
}: HousesSelectModalProps) {
  const {houseId, setHouseId} = useHouseDetailContext();

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
          data={houses}
          ItemSeparatorComponent={Divider}
          renderItem={({item}) => (
            <ListItem
              onPressHandler={() => {
                setHouseId(String(item.id));
                onClose();
              }}
              title={item.name}
              subTitle={`${item.members.length} members`}
              rightEle={
                houseId === String(item.id) ? (
                  <Icon size="small" name="checkmark-outline" />
                ) : null
              }
              level="1"
            />
          )}
        />
      </Layout>
    </Modal>
  );
}

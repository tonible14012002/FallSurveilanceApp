import {Divider, Layout, List, Modal} from '@ui-kitten/components';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import {useHouseDetailContext} from './context';

interface HousesSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HousesSelectModal({isOpen, onClose}: HousesSelectModalProps) {
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
          data={[1, 2, 3, 4, 5, 6, 7]}
          ItemSeparatorComponent={Divider}
          renderItem={({index}) => (
            <ListItem
              onPressHandler={() => {
                setHouseId(String(index + 1));
                onClose();
              }}
              title={`House ${index + 1}`}
              subTitle="2 members"
              rightEle={
                houseId === String(index + 1) ? (
                  <Icon size="small" name="checkmark-outline" />
                ) : null
              }
              wrapperStyle={{
                borderBottomColor: 'rgba(255,255,255,0.3)',
                borderBottomWidth: 1,
              }}
              level="3"
            />
          )}
        />
      </Layout>
    </Modal>
  );
}

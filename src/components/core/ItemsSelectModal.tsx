import {Divider, Layout, List, Modal} from '@ui-kitten/components';
import type {ListRenderItem} from '@react-native/virtualized-lists';

interface ItemsSelectModalProps<T> {
  isOpen: boolean;
  items: Array<T> | [];
  renderItem: ListRenderItem<T>;
  onClose: () => void;
}

export function ItemsSelectModal<T>({
  isOpen,
  items,
  renderItem,
  onClose,
}: ItemsSelectModalProps<T>) {
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
          data={items}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </Layout>
    </Modal>
  );
}

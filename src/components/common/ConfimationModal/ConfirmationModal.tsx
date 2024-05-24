import {Button, Modal, Text} from '@ui-kitten/components';
import {Dimensions, StyleSheet, View} from 'react-native';

interface ConfirmationModalProps {
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  description?: string;
  onAccept: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  isLoading,
  title,
  description,
  onAccept,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal visible={isOpen} onBackdropPress={onCancel}>
      <View style={styles.wrapper}>
        <Text category="h6" style={{textAlign: 'center'}}>
          {title}
        </Text>
        {description && (
          <Text style={{textAlign: 'center'}}>{description}</Text>
        )}

        <View style={{flexDirection: 'row', gap: 10, flex: 1, marginTop: 40}}>
          <Button status="basic" onPress={onCancel} style={{flex: 1}}>
            Cancel
          </Button>
          <Button
            status="danger"
            disabled={isLoading}
            onPress={onAccept}
            style={{flex: 1}}>
            Accept
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 16,
    elevation: 8,
    borderColor: 'lightgray',
    width: Dimensions.get('screen').width - 32,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
});

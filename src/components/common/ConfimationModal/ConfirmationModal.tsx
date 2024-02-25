import {Button, Input, Modal, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {UserPicker} from '~/components/UserPicker';
import Icon from '~/components/core/Icon';
import {BasicUser, User} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';

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
        <Text category="h5" style={{textAlign: 'center', marginBottom: 15}}>
          {title}
        </Text>

        {description && (
          <Text style={{textAlign: 'center', marginBottom: 15}}>
            {description}
          </Text>
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
    borderRadius: 10,
    borderColor: 'lightgray',
    width: 365,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
});

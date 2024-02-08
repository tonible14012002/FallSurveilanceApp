import {Layout, Modal, Text} from '@ui-kitten/components';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDisclosure} from '~/hooks/common';
import Icon from '../core/Icon';
import List from '../core/List';
import MembersListContent from './MembersListContent';
import SearchUser from './SearchUser';

export default function AddMemberBottomSheet() {
  const {isOpen, onClose, onOpen} = useDisclosure();

  return (
    <View>
      <List
        containerStyle={{marginTop: 10}}
        listStyle={{flexDirection: 'row', gap: 5}}
        title={
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text category="p2">Add members</Text>
            <Text appearance="hint">•</Text>
            <Text appearance="hint" category="c1">
              2 members
            </Text>
          </View>
        }
        detailNavigator={
          <TouchableOpacity onPress={onOpen}>
            <Layout level="3" style={{padding: 5, borderRadius: 100}}>
              <Icon name="plus" size="small" />
            </Layout>
          </TouchableOpacity>
        }>
        <MembersListContent />
      </List>

      <Modal
        visible={isOpen}
        onBackdropPress={onClose}
        style={styles.container}>
        <Layout style={styles.contentContainer} level="3">
          <SearchUser />
          <ScrollView style={{maxHeight: 300}}>
            <List
              title={
                <Text category="s2" style={{opacity: 0.7}}>
                  Members list
                </Text>
              }
              containerStyle={{
                padding: 10,
              }}
              listStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 5,
              }}>
              <MembersListContent />
            </List>
          </ScrollView>
        </Layout>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    borderTopStartRadius: 16,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    overflow: 'hidden',
    width: 370,
    height: 450,
    marginHorizontal: 'auto',
  },
  contentContainer: {
    flex: 1,
  },
});

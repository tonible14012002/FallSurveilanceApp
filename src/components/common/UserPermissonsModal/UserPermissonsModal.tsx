import {
  Avatar,
  Button,
  CheckBox,
  Layout,
  List,
  Modal,
  Text,
} from '@ui-kitten/components';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ListItem from '~/components/core/ListItem';
import {PAGINATION} from '~/constants/common';
import {useSearchUsers} from '~/hooks/useSearchUsers';
import {BasicUser} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';

interface UserPermissionsModalProps {
  isOpen: boolean;
  // userCollections: BaseResponse<User[]>[];
  permissions: Record<string, string>;
  onClose: () => void;
}

export const UserPermissionsModal = (props: UserPermissionsModalProps) => {
  const {isOpen, permissions, onClose} = props;

  const {userCollections, isLoading} = useSearchUsers({
    page: 1,
    pageSize: PAGINATION.SMALL,
    allowFetch: true,
  });
  const [clickedUser, setClickedUser] = useState(false);

  const renderUserCollection = ({item}: {item: BaseResponse<BasicUser[]>}) => {
    const {data} = item;
    const userPermisisons: Array<keyof typeof permissions> = [
      'ASSIGN',
      'ACCESS',
      'RECEIVE_NOTIFICATION',
    ];
    return (
      <List
        key={item.pageable?.next_page}
        data={data}
        renderItem={({item: user}) => {
          // const isSelected = [].some(u => u.id === user.id);
          return (
            <ListItem
              size="medium"
              onPressHandler={() => {
                // onUserItemPress(user, isSelected);
                setClickedUser(true);
              }}
              wrapperStyle={{
                marginHorizontal: -16,
              }}
              level="1"
              rightEle={
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    paddingRight: 2,
                  }}>
                  {Object.entries(permissions).map(([permission]) => {
                    if (
                      userPermisisons.includes(
                        permission as keyof typeof permissions,
                      )
                    ) {
                      return (
                        <View
                          style={{
                            width: 8,
                            height: 12,
                            borderRadius: 5,
                            padding: 1,
                            borderWidth: 1,
                            backgroundColor:
                              permissions[
                                permission as keyof typeof permissions
                              ],
                          }}
                        />
                      );
                    }
                  })}
                </View>
              }
              isRightIcon
              leftIcon={
                <Avatar
                  source={{
                    uri: user.avatar,
                  }}
                />
              }
              title={user.nickname}
            />
          );
        }}
      />
    );
  };

  const renderPermissionEditor = () => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <List
          style={{backgroundColor: '#fff'}}
          data={Object.entries(permissions)}
          renderItem={({item}) => {
            // const isSelected = [].some(u => u.id === user.id);
            const [permission, color] = item;
            return (
              <ListItem
                size="medium"
                onPressHandler={() => {
                  // onUserItemPress(user, isSelected);
                }}
                wrapperStyle={{
                  marginHorizontal: -16,
                }}
                level="1"
                rightEle={
                  <View
                    style={{
                      width: 12,
                      height: 20,
                      borderRadius: 5,
                      padding: 1,
                      borderWidth: 1,
                      backgroundColor:
                        permissions[permission as keyof typeof permissions],
                    }}
                  />
                }
                isRightIcon
                leftIcon={<CheckBox checked={true} onChange={() => {}} />}
                title={permission}
              />
            );
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            paddingRight: 2,
          }}>
          <Button
            style={{flex: 1}}
            status="basic"
            onPress={() => setClickedUser(false)}>
            Back
          </Button>
          <Button style={{flex: 1}}>Save</Button>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={isOpen} onBackdropPress={onClose}>
      <Layout
        style={{
          width: 370,
          minHeight: 480,
          elevation: 3,
          borderRadius: 16,
          padding: 15,
          paddingBottom: 10,
          overflow: 'hidden',
        }}>
        {!clickedUser && (
          <>
            <Text category="h5" style={{textAlign: 'center', marginBottom: 15}}>
              Members Permissions
            </Text>
            <List
              showsVerticalScrollIndicator={false}
              style={[{flex: 1, backgroundColor: 'transparent'}]}
              scrollEnabled={true}
              data={userCollections ?? []}
              renderItem={renderUserCollection}
            />
          </>
        )}

        {clickedUser && (
          <>
            <Text category="h5" style={{textAlign: 'center', marginBottom: 15}}>
              Khoa's Permissions
            </Text>
            {renderPermissionEditor()}
          </>
        )}
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    elevation: 2,
    borderRadius: 8,
    overflow: 'hidden',
    transform: [{translateY: 12}],
  },
});

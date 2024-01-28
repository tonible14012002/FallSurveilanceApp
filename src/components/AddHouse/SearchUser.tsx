import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input, Text} from '@ui-kitten/components';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {SearchUsersSchema, SearchUsersSchemaType} from '~/schema/form';
import Icon from '../core/Icon';
import Avatar from '../core/Avatar';
import List from '../core/List';
import {ScrollView} from 'react-native-gesture-handler';
import {useCallback} from 'react';

export default function SearchUser() {
  const {renderIcon} = useRenderIcon();

  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm<SearchUsersSchemaType>({
    resolver: zodResolver(SearchUsersSchema),
  });

  const onUserPress = useCallback(
    (username: string) => {
      setValue('username', username);
    },
    [setValue],
  );

  const onSubmit = async (data: any) => {
    try {
    } catch (e) {
    } finally {
    }
  };
  return (
    <View>
      <View style={styles.searchForm}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              accessoryLeft={renderIcon('person')}
              size="large"
              placeholder="Search"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
            />
          )}
          name="username"
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          size="tiny"
          style={{width: 40, height: 40}}>
          <Icon name="navigation-2-outline" />
        </Button>
      </View>
      <ScrollView style={{maxHeight: 200}}>
        <List
          title={
            <Text category="s2" style={{opacity: 0.7}}>
              Invited users
            </Text>
          }
          containerStyle={{
            padding: 10,
          }}
          listStyle={{
            flexDirection: 'row',
            gap: 5,
          }}>
          <TouchableOpacity
            style={styles.userRow}
            onPress={() => onUserPress('khoatruong19')}>
            <Avatar
              avatarProps={{
                source: {
                  uri: 'https://sm.ign.com/ign_za/cover/m/marvels-sp/marvels-spider-man-remastered_az82.jpg',
                },
                style: {
                  width: 40,
                  height: 40,
                },
              }}
              pressable={false}
              text={<Text category="s2">khoatruong19</Text>}
              textPosition="inline"
            />
          </TouchableOpacity>
        </List>
      </ScrollView>
      <View style={styles.searchResult}>
        <View style={styles.userRow}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchForm: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchResult: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  userRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

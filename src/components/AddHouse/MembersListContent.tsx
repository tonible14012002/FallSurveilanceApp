import {Text} from '@ui-kitten/components';
import Avatar from '../core/Avatar';
import Icon from '../core/Icon';

const fakeMembers = [
  {
    id: 1,
    username: 'khoa123',
    avatarUrl:
      'https://sm.ign.com/ign_za/cover/m/marvels-sp/marvels-spider-man-remastered_az82.jpg',
  },
  {
    id: 2,
    username: 'khoa1234',
    avatarUrl:
      'https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxMDk5NzY2MzU5MTY1/on-the-set-of-batman.jpg',
  },
];

export default function MembersListContent() {
  return fakeMembers.map(member => (
    <Avatar
      key={member.id}
      pressable={false}
      avatarProps={{
        source: {uri: member.avatarUrl},
        style: {
          width: 50,
          height: 50,
        },
      }}
      icon={<Icon name="close-outline" size="large" fill="#fff" />}
      text={
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          category="s2"
          style={{opacity: 0.7, maxWidth: 50, textAlign: 'center'}}>
          {member.username}asdasd
        </Text>
      }
      iconWrapperStyle={{
        top: -8,
        right: -5,
      }}
    />
  ));
}

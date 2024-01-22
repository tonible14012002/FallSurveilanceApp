import {Avatar, Text} from '@ui-kitten/components';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';

export default function Account() {
  return (
    <ScreenLayout
      hasPadding
      isScrollable
      topBar={
        <TopBar
          title="Account"
          rightIcon={
            <Avatar
              source={{
                uri: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-1/369053435_3628631834068330_6252299390237773315_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=0A4cTRL139QAX8I1rlU&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCYocC0VA5dKjoQC9EyWOqFvdGVMjfK2-dvlAh7NJUG9Q&oe=65B22743',
              }}
            />
          }
        />
      }>
      <Text>Welcome back!</Text>
    </ScreenLayout>
  );
}

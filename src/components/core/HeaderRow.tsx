import {useNavigation} from '@react-navigation/native';
import {Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';

interface HeaderRowProps {
  title: string;
  menu?: React.ReactElement;
}

export default function HeaderRow({title, menu}: HeaderRowProps) {
  const navigation = useNavigation();

  const handleNavigateBack = () => navigation.goBack();

  const __renderMenu = () => (
    <View style={styles.menuContainer}>
      <Icon
        name="menu-outline"
        style={styles.menuButton}
        onPress={handleNavigateBack}
      />
      <View style={{position: 'absolute', top: 30}}>{menu}</View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Icon
        name="chevron-left-outline"
        style={styles.backButton}
        onPress={handleNavigateBack}
      />
      <Text category="h5" style={{textAlign: 'center', width: '100%'}}>
        {title}
      </Text>
      {menu && __renderMenu()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    height: 60,
  },
  backButton: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: -25,
  },
  menuContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
  menuButton: {
    width: 32,
    height: 32,
  },
});

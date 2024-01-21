import {Text} from '@ui-kitten/components';
import List from '../core/List';
import HouseItem from './HouseItem';

interface HousesListProps {
  title: string;
}

export default function HousesList({title}: HousesListProps) {
  const __renderListTitle = () => (
    <Text category="s2" style={{opacity: 0.7}}>
      {title}
    </Text>
  );

  return (
    <List title={__renderListTitle()} containerStyle={{marginTop: 20}}>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <HouseItem key={idx} />
        ))}
    </List>
  );
}

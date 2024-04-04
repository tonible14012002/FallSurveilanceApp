import React from 'react';
import {Text} from 'react-native';
import {formatDistanceToNow} from 'date-fns';

interface TimeAgoProps {
  date: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({date}) => {
  const parsedDate = new Date(date);
  const timeAgo = formatDistanceToNow(parsedDate, {addSuffix: true});

  return <Text>{timeAgo}</Text>;
};

export default TimeAgo;

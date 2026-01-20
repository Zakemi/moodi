import { Diary } from '@/src/types';
import { Text, View } from 'react-native';
import { styles } from './DiaryItem.styles';

interface DiaryItemProps {
  diary: Diary;
}

export function DiaryItem({ diary }: DiaryItemProps) {
  const createdDate = new Date(diary.created);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {createdDate.toLocaleDateString('EN', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Text>
        <Text style={styles.headerText}>
          {createdDate.toLocaleDateString('EN', { weekday: 'long' })}
        </Text>
      </View>
      <View style={styles.separator} />
      <Text style={styles.mainText}>{diary.text}</Text>
      {!!diary.moods.length && (
        <Text style={styles.footer}>{diary.moods.join(', ')}</Text>
      )}
    </View>
  );
}

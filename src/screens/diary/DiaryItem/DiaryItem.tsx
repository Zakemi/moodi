import { Diary } from '@/src/types';
import { Image, Text, View } from 'react-native';
import { useThemedStyle } from './DiaryItem.styles';

interface DiaryItemProps {
  diary: Diary;
}

export function DiaryItem({ diary }: DiaryItemProps) {
  const createdDate = new Date(diary.created);
  const styles = useThemedStyle();

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
        <Text style={styles.moods}>{diary.moods.join(', ')}</Text>
      )}
      {!!diary.photoUrls.length && (
        <View style={styles.photos}>
          {diary.photoUrls.map((photoUrl) => (
            <Image key={photoUrl} width={50} height={50} src={photoUrl} />
          ))}
        </View>
      )}
    </View>
  );
}

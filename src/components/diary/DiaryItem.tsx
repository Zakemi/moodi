import {
  PRIMARY_COLOR,
  SECONDARY_VARIANT_COLOR,
  SURFACE_COLOR,
} from '@/src/constants/style';
import { Text, View } from 'react-native';
import { Diary } from '../../types';

interface DiaryItemProps {
  diary: Diary;
}

export function DiaryItem({ diary }: DiaryItemProps) {
  const createdDate = new Date(diary.created);

  return (
    <View
      style={{ borderRadius: 20, padding: 20, backgroundColor: SURFACE_COLOR }}
    >
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ color: SECONDARY_VARIANT_COLOR }}>
          {createdDate.toLocaleDateString()}
        </Text>
        <Text style={{ color: SECONDARY_VARIANT_COLOR }}>
          {createdDate.toLocaleDateString('EN', { weekday: 'long' })}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: SECONDARY_VARIANT_COLOR,
          marginTop: 3,
          marginBottom: 10,
        }}
      />
      <Text style={{ color: PRIMARY_COLOR }}>{diary.text}</Text>
      {!!diary.moods.length && (
        <Text style={{ color: SECONDARY_VARIANT_COLOR, paddingTop: 10 }}>
          {diary.moods.join(', ')}
        </Text>
      )}
    </View>
  );
}

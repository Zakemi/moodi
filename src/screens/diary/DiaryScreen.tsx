import { ON_ACCENT_COLOR } from '@/src/contexts/Theme/constants';
import { Diary } from '@/src/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableHighlight, View, VirtualizedList } from 'react-native';
import { DiaryItem } from './DiaryItem';
import { useThemedStyle } from './DiaryScreen.styles';
import { JSX } from 'react';

interface DiaryScreenProps {
  items: Diary[];
  onAddNewDiary: () => void;
}

export function DiaryScreen({
  items,
  onAddNewDiary,
}: DiaryScreenProps): JSX.Element {
  const styles = useThemedStyle();

  return (
    <View style={styles.container}>
      <View style={styles.addNewContainer}>
        <TouchableHighlight onPress={onAddNewDiary}>
          <MaterialIcons
            size={35}
            name="add"
            color={ON_ACCENT_COLOR}
            style={styles.addNewIcon}
          />
        </TouchableHighlight>
      </View>
      {!!items.length && (
        <VirtualizedList
          ItemSeparatorComponent={() => (
            <View style={styles.diaryItemSeparator} />
          )}
          renderItem={({ item }: { item: Diary }) => <DiaryItem diary={item} />}
          keyExtractor={(item) => item.id}
          getItemCount={(_data) => _data?.length}
          getItem={(data, index): Diary => data[index]}
          data={items}
        />
      )}
      {!items.length && (
        <View style={styles.emptyDiaryContainer}>
          <Text style={styles.emptyDiaryText}>
            Write something to your diary
          </Text>
        </View>
      )}
    </View>
  );
}

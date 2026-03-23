import { ON_ACCENT_COLOR } from '@/src/constants/style';
import { diaryEntries } from '@/src/store/diary';
import { Diary } from '@/src/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Text, TouchableHighlight, View, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';
import { DiaryItem } from './DiaryItem';
import { styles } from './DiaryTab.styles';

export function DiaryTab() {
  const router = useRouter();
  const items = useSelector(diaryEntries);

  return (
    <View style={styles.container}>
      <View style={styles.addNewContainer}>
        <TouchableHighlight onPress={() => router.navigate('/modal')}>
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
